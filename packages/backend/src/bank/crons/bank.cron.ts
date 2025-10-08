import { Injectable, Logger } from '@nestjs/common';
import { BankService } from '../bank.service';
import { DbCron } from '@/sys-cron/sys-cron.decorator';
import { CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BankResult } from '@/bank-result/entities/bank-result.entity';
import { BankResultType } from '@/bank-result/enums/bank-result.enum';
import { TransactionStatus } from '@/transaction/enums/transaction.enum';
import { Transaction } from '@/transaction/entities/transaction.entity';
import { UserService } from '@/user/user.service';

type BankTransaction = {
  transactionID: string;
  amount: string;
  description: string;
  transactionDate: string;
  type: 'IN' | 'OUT';
};

type BankApiResponse = {
  status: boolean;
  message: string;
  transactions: BankTransaction[];
};

@Injectable()
export class BankCron {
  private readonly logger = new Logger(BankCron.name);
  constructor(
    private readonly bankService: BankService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  @DbCron({
    name: 'CronBank',
    expression: CronExpression.EVERY_30_SECONDS,
  })
  async cronBank() {
    const fromUser = await this.getBankUser();
    if (!fromUser) {
      return;
    }
    const banks = await this.bankService.findAll({
      where: {
        isActive: true,
      },
      relations: {
        bankResults: true,
        transactions: true,
      },
      select: {
        cronUrl: true,
        bankResults: {
          transactionID: true,
        },
        transactions: true,
      },
    });
    for (const bank of banks) {
      try {
        const { data } = await firstValueFrom(
          this.httpService.get<BankApiResponse>(bank.cronUrl),
        );
        if (data.status) {
          const newBankResults = [];
          const newTransactions = [];
          for (const transaction of data.transactions) {
            const isExits = bank.bankResults.some(
              result => result.transactionID === transaction.transactionID,
            );
            if (!isExits) {
              const result = {
                transactionID: transaction.transactionID,
                amount: Number(transaction.amount),
                description: transaction.description,
                transactionDate: new Date(),
                type: transaction.type as BankResultType,
                isProcessed: false,
              } as BankResult;

              newBankResults.push(result);
              const toUser = await this.findUserByDescription(
                transaction.description,
              );
              if (toUser) {
                result.isProcessed = true;

                newTransactions.push({
                  fromUser: fromUser,
                  toUser: toUser,
                  items: bank.items.map(item => ({
                    quantity: Number(transaction.amount) * item.quantity,
                    itemType: {
                      id: item.itemType.id,
                    },
                    expirationDate: item.expirationDate,
                  })),
                  status: TransactionStatus.PENDING,
                  isAccepted: true,
                } as Transaction);
              } else {
                result.isProcessed = false;
              }
            }
          }
          if (newBankResults.length > 0 || newTransactions.length > 0) {
            await this.bankService.dataSource.transaction(async transaction => {
              await transaction.getRepository(BankResult).save(
                newBankResults.map(result => ({
                  ...result,
                  bank: {
                    id: bank.id,
                  },
                })),
              );
              await transaction.getRepository(Transaction).save(
                newTransactions.map(transaction => ({
                  ...transaction,
                  bank: {
                    id: bank.id,
                  },
                })),
              );
            });
            await this.bankService.clearAllCache();
          }
        }
      } catch (error) {
        this.logger.error(error);
        this.logger.error(`❌ CronBank bị lỗi: ${error}`);
      }
    }
  }

  async getBankUser() {
    const isExits = await this.userService.findOne({
      where: {
        email: 'bot-bank@sys.com',
      },
    });
    if (!isExits) {
      return this.userService.create({ email: 'bot-bank@sys.com' });
    }
    return isExits;
  }

  async findUserByDescription(description: string) {
    const trimDescription = description.trim().replace(/\s+/g, ' ');
    const regex = /SYS(\d+)BOT/gm;
    const userId = regex.exec(trimDescription)?.[1];
    if (userId) {
      const user = await this.userService.findOne({
        where: {
          id: Number(userId),
        },
      });
      if (user) return user;
    }
    return null;
  }
}
