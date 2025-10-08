import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import createBaseService from '../base/base.service';
import { Redis } from 'ioredis';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import { Permission } from '@/permission/permission.entity';
import { PermissionDtoChildren } from '@/permission/dtos/permission.dto';
import { generateHash } from '@/base/utils/generateHash';
import {
  InventoriesUnitAction,
  UserInventoriesDto,
  UserInventoriesTrackingDto,
} from './dtos/inventories.dto';
import { Inventory } from '@/inventory/inventory.entity';
import { ItemType } from '@/inventory/item-type/item-type.entity';
import { BaseTrackingAction } from '@/base/dtos/base-tracking.dto';
@Injectable()
export class UserService extends createBaseService(User) {
  public readonly PERMISSION_KEY = `${this.PERFIX}:permissions`;
  public readonly INVENTORIES_KEY = `${this.PERFIX}:inventories`;

  constructor(
    @InjectDataSource()
    dataSource: DataSource,
    @InjectRepository(User)
    repository: Repository<User>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
  }

  async update(id: number, data: DeepPartial<User>): Promise<User> {
    const { email, ...userData } = data as unknown as UserDto;
    // if (permissions) {
    //   const user = await this.findOne({
    //     where: {
    //       id,
    //     },
    //   });
    //   for (const permission of permissions) {
    //     const isPermissionExits = await this.permissionRepository.findOne({
    //       where: {
    //         id: permission.id,
    //       },
    //     });

    //     if (!isPermissionExits) {
    //       throw new NotFoundException(`Permission ${permission.id} not found`);
    //     }
    //   }

    //   user.permissions = permissions.map(
    //     permission => ({ id: permission.id }) as Permission,
    //   );

    //   if (inventories) {
    //     const oldInventories = user.inventories;
    //     for (const inventory of inventories) {
    //       if (inventory.action === InventoriesUnitAction.ADD) {
    //         const isInventoryExits = oldInventories.find(
    //           oldInventory => oldInventory.itemType.id === inventory.itemId,
    //         );
    //         if (isInventoryExits) {
    //           isInventoryExits.quantity += inventory.quantity;
    //         } else {
    //           const newInventory = new Inventory();
    //           newInventory.user = user;
    //           newInventory.itemType = { id: inventory.itemId } as ItemType;
    //           newInventory.quantity = inventory.quantity;
    //           newInventory.expirationDate = inventory.expirationDate;
    //           user.inventories.push(newInventory);
    //         }
    //       } else if (inventory.action === InventoriesUnitAction.REMOVE) {
    //         const isInventoryExits = oldInventories.find(
    //           oldInventory => oldInventory.itemType.id === inventory.itemId,
    //         );
    //         if (isInventoryExits) {
    //           isInventoryExits.quantity -= inventory.quantity;
    //           if (isInventoryExits.quantity <= 0) {
    //             user.inventories = user.inventories.filter(
    //               inventory => inventory.id !== isInventoryExits.id,
    //             );
    //           }
    //         }
    //       }
    //     }
    //     user.inventories = oldInventories;
    //   }

    //   await this.repository.save(user);
    // }
    return super
      .update(id, userData)
      .then(() => this.findOne({ where: { id } }));
  }
  async create(data: DeepPartial<User>): Promise<User> {
    const email = data.email;
    if (email) {
      const userCount = await this.findOne({
        where: { email },
        withDeleted: true,
      });
      if (userCount) {
        if (userCount.deletedAt !== null) {
          await this.repository.restore(userCount.id);
          await this.clearAllCache();
          return this.findById(userCount.id);
        } else {
          return userCount;
        }
      }
    }
    return super.create(data);
  }
  async delete(id: number): Promise<void> {
    return super.softDelete(id);
  }

  async findOneWithPermissions(userId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: {
        permissions: true,
      },
      select: {
        permissions: {
          id: true,
          name: true,
        },
        id: true,
      },
      cache: {
        id: `${this.PERMISSION_KEY}:${generateHash(userId)}`,
        milliseconds: this.CACHE_TTL,
      },
    });
    return user;
  }

  async updateWithPermissions(
    userId: number,
    permissions: PermissionDtoChildren[],
  ): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['permissions'],
      cache: {
        id: `${this.PERMISSION_KEY}:${generateHash(userId)}`,
        milliseconds: this.CACHE_TTL,
      },
    });

    user.permissions = permissions.map(
      permission => ({ id: permission.id }) as Permission,
    );

    return this.repository.save(user).then(async () => {
      await this.clearCacheByPrefix(this.PERMISSION_KEY, true);
      return this.findOne({ where: { id: userId } });
    });
  }

  async findOneWithInventories(userId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['inventories.itemType'],
      cache: {
        id: `${this.INVENTORIES_KEY}:${generateHash(userId)}`,
        milliseconds: this.CACHE_TTL,
      },
    });

    return user;
  }

  async updateWithInventories(
    userId: number,
    inventorieDto: UserInventoriesDto,
  ): Promise<User> {
    const { inventories } = inventorieDto;
    if (!inventories || inventories.length === 0) {
      return this.findOneWithInventories(userId);
    }
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['inventories.itemType'],
      cache: {
        id: `${this.INVENTORIES_KEY}:${generateHash(userId)}`,
        milliseconds: this.CACHE_TTL,
      },
    });

    for (const inventory of inventories) {
      const isInventoryExits = user.inventories.find(
        uInventory =>
          uInventory.itemType.id === inventory.itemId &&
          ((!inventory.expirationDate && !uInventory.expirationDate) ||
            new Date(uInventory.expirationDate).toISOString() ==
              new Date(inventory.expirationDate).toISOString()),
      );
      if (isInventoryExits) {
        if (inventory.action === InventoriesUnitAction.ADD) {
          isInventoryExits.quantity += inventory.quantity;
        } else if (inventory.action === InventoriesUnitAction.SET) {
          isInventoryExits.quantity = inventory.quantity;
        } else if (inventory.action === InventoriesUnitAction.REMOVE) {
          isInventoryExits.quantity -= inventory.quantity;
        }
        if (isInventoryExits.quantity <= 0) {
          user.inventories = user.inventories.filter(
            inventory => inventory.id !== isInventoryExits.id,
          );
        }
      } else {
        const newInventory = new Inventory();
        newInventory.user = user;
        newInventory.itemType = { id: inventory.itemId } as ItemType;
        newInventory.quantity = inventory.quantity;
        newInventory.expirationDate = inventory.expirationDate;
        user.inventories.push(newInventory);
      }
    }

    return this.repository.save(user).then(async () => {
      await this.clearCacheByPrefix(this.INVENTORIES_KEY, true);
      return this.findOneWithInventories(userId);
    });
  }

  async updateWithInventoriesTracking(
    userId: number,
    inventorieDto: UserInventoriesTrackingDto[],
  ): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['inventories.itemType'],
      cache: {
        id: `${this.INVENTORIES_KEY}:${generateHash(userId)}`,
        milliseconds: this.CACHE_TTL,
      },
    });

    for (const inventory of inventorieDto) {
      const { data, action } = inventory;
      if (action === BaseTrackingAction.CREATE) {
        const newInventory = new Inventory();
        newInventory.user = user;
        newInventory.itemType = { id: data.itemType.id } as ItemType;
        newInventory.quantity = data.quantity;
        newInventory.expirationDate = data.expirationDate;
        user.inventories.push(newInventory);
      } else if (action === BaseTrackingAction.UPDATE) {
        const isInventoryExits = user.inventories.find(
          uInventory => uInventory.id === data.id,
        );
        if (isInventoryExits) {
          isInventoryExits.quantity = data.quantity;
          isInventoryExits.expirationDate = data.expirationDate;
        }
      } else if (action === BaseTrackingAction.DELETE) {
        user.inventories = user.inventories.filter(
          inventory => inventory.id !== data.id,
        );
      }
    }

    return this.repository.save(user).then(async () => {
      await this.clearCacheByPrefix(this.INVENTORIES_KEY, true);
      return this.findOneWithInventories(userId);
    });
  }
}
