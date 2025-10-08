import { Injectable, Logger } from '@nestjs/common';
import { TransactionService } from '../transaction.service';
import { DbCron } from '@/sys-cron/sys-cron.decorator';
import { CronExpression } from '@nestjs/schedule';
import { TransactionStatus } from '../enums/transaction.enum';
import { Transaction } from '../entities/transaction.entity';
import { User } from '@/user/user.entity';
import { Inventory } from '@/inventory/inventory.entity';
import { UserService } from '@/user/user.service';

@Injectable()
export class TransactionCron {
  private readonly logger = new Logger(TransactionCron.name);
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

  @DbCron({
    name: 'CronTransaction',
    expression: CronExpression.EVERY_30_SECONDS,
  })
  async cronTransaction() {
    // const earliestTransaction = await this.transactionService.findOne({
    //   where: { status: TransactionStatus.PENDING },
    //   order: {
    //     createdAt: 'ASC',
    //   },
    // });
    const earliestTransaction = await this.transactionService.dataSource
      .getRepository(Transaction)
      .createQueryBuilder('transaction')
      .where('transaction.status = :status', {
        status: TransactionStatus.PENDING,
      })
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();

    if (!earliestTransaction) {
      return;
    }

    try {
      await this.transactionService.dataSource.transaction(async manager => {
        const transaction = await manager.getRepository(Transaction).findOne({
          where: { id: earliestTransaction.id },
          relations: {
            fromUser: true,
            toUser: true,
            items: {
              itemType: true,
            },
          },
          select: {
            fromUser: {
              id: true,
            },
            toUser: {
              id: true,
            },
            items: {
              itemType: {
                id: true,
              },
              id: true,
              quantity: true,
              expirationDate: true,
            },
          },
        });

        if (!transaction) {
          return;
        }
        const fromUser = await manager.getRepository(User).findOne({
          where: { id: transaction.fromUser.id },
          relations: {
            inventories: true,
          },
        });
        if (!fromUser) {
          return;
        }

        const toUser = await manager.getRepository(User).findOne({
          where: { id: transaction.toUser.id },
          relations: {
            inventories: true,
          },
        });
        if (!toUser) {
          return;
        }

        const newFromInventories = [];
        const newToInventories = [];
        const deletedFromInventories = [];
        for (const item of transaction.items) {
          const fromInventory = fromUser.inventories.find(
            inventory =>
              inventory.itemType.id === item.itemType.id &&
              inventory.expirationDate === item.expirationDate &&
              inventory.quantity >= item.quantity,
          );
          if (!fromInventory) {
            this.logger.error(
              `Inventory not found for item ${item.itemType.id}`,
              JSON.stringify(item),
            );
            throw new Error('Inventory not found');
          }

          newFromInventories.push({
            id: fromInventory.id,
            quantity: fromInventory.quantity - item.quantity,
          });

          if (fromInventory.quantity === item.quantity) {
            deletedFromInventories.push(fromInventory.id);
          }

          const toInventory = toUser.inventories.find(
            inventory =>
              inventory.itemType.id === item.itemType.id &&
              inventory.expirationDate === item.expirationDate,
          );

          if (!toInventory) {
            newToInventories.push({
              itemType: { id: item.itemType.id },
              quantity: item.quantity,
              expirationDate: item.expirationDate,
              user: {
                id: toUser.id,
              },
            });
          } else {
            newToInventories.push({
              id: toInventory.id,
              quantity: toInventory.quantity + item.quantity,
            });
          }
        }

        this.logger.debug(
          `New from inventories: ${JSON.stringify(newFromInventories)}`,
        );
        this.logger.debug(
          `New to inventories: ${JSON.stringify(newToInventories)}`,
        );
        this.logger.debug(
          `Deleted from inventories: ${JSON.stringify(deletedFromInventories)}`,
        );

        for (const inventory of newFromInventories) {
          const lockedInventory = await manager
            .getRepository(Inventory)
            .createQueryBuilder('inventory')
            .where('inventory.id = :id', { id: inventory.id })
            .setLock('pessimistic_write')
            .getOne();
          if (!lockedInventory) {
            throw new Error('Inventory not found');
          }
          lockedInventory.quantity = inventory.quantity;
          await manager.getRepository(Inventory).save(lockedInventory);
        }

        for (const inventory of newToInventories) {
          if (inventory.id) {
            const lockedInventory = await manager
              .getRepository(Inventory)
              .createQueryBuilder('inventory')
              .where('inventory.id = :id', { id: inventory.id })
              .setLock('pessimistic_write')
              .getOne();
            if (!lockedInventory) {
              throw new Error('Inventory not found');
            }
            lockedInventory.quantity = inventory.quantity;
            await manager.getRepository(Inventory).save(lockedInventory);
          } else {
            await manager.getRepository(Inventory).save(inventory);
          }
        }

        transaction.status = TransactionStatus.SUCCESS;
        await manager.getRepository(Transaction).save({
          id: transaction.id,
          status: TransactionStatus.SUCCESS,
        });
        this.logger.debug(
          `Transaction ${transaction.id} processed`,
          transaction,
        );
      });
      this.logger.debug(
        `Transaction ${earliestTransaction.id} processed`,
        earliestTransaction,
      );
      await this.transactionService.clearAllCache();
      await this.userService.clearCacheByPrefix(
        this.userService.INVENTORIES_KEY,
        true,
      );
    } catch (error) {
      this.logger.error(`Transaction ${earliestTransaction.id} failed`, error);
    }
  }
}
