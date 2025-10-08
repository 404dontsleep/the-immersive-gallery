import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsSelect,
  Repository,
} from 'typeorm';
import { Bank } from './entities/bank.entity';
import createBaseService from '@/base/base.service';
import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import { Redis } from 'ioredis';
import { cloneDeep, merge } from 'lodash';
import { Transaction } from '@/transaction/entities/transaction.entity';
import { BankResult } from '@/bank-result/entities/bank-result.entity';
const DEFAULT_SELECT: FindOptionsSelect<Bank> = {
  id: true,
  name: true,
  lastCron: true,
  description: true,
  items: {
    id: true,
    itemType: {
      id: true,
    },
    quantity: true,
    expirationDate: true,
  },
  isActive: true,
  deletedAt: true,
};
@Injectable()
export class BankService extends createBaseService(Bank) {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(Bank) repository: Repository<Bank>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
  }

  findAll(options?: FindManyOptions<Bank>): Promise<Bank[]> {
    return super.findAll({
      ...options,
      relations: merge(options.relations ?? {}, {
        items: {
          itemType: true,
        },
      }),
      select: merge(options.select ?? {}, DEFAULT_SELECT),
    });
  }
  findOne(options?: FindOneOptions<Bank>): Promise<Bank> {
    return super.findOne({
      ...options,
      relations: {
        items: {
          itemType: true,
        },
      },
      select: merge(options.select ?? {}, DEFAULT_SELECT),
    });
  }
  async update(id: number, data: DeepPartial<Bank>): Promise<Bank> {
    const oldData = await this.findOne({
      where: { id },
    });
    const { items, bankResults, ...rest } = data;
    if (oldData) {
      oldData.items = cloneDeep(items) as any;
      oldData.bankResults = cloneDeep(bankResults) as any;
      merge(oldData, rest);
      await super.clearAllCache();
      await this.repository.save(oldData);
    }
    return oldData;
  }

  delete(id: number): Promise<void> {
    return super.softDelete(id);
  }

  getAllCacheKey(): string[] {
    return [
      ...super.getAllCacheKey(),
      `${Transaction.name}:findAll`,
      `${BankResult.name}:findAll`,
      `${BankResult.name}:count`,
    ];
  }
}
