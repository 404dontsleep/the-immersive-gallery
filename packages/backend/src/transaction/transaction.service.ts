import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import createBaseService from '@/base/base.service';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import { Redis } from 'ioredis';

@Injectable()
export class TransactionService extends createBaseService(Transaction) {
  constructor(
    @InjectDataSource()
    dataSource: DataSource,
    @InjectRepository(Transaction)
    repository: Repository<Transaction>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
  }

  findAll(options?: FindManyOptions<Transaction>): Promise<Transaction[]> {
    return super.findAll({
      ...options,
      relations: {
        fromUser: true,
        toUser: true,
        items: {
          itemType: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      select: {
        fromUser: {
          id: true,
          email: true,
        },
        toUser: {
          id: true,
          email: true,
        },
        items: {
          id: true,
          itemType: {
            id: true,
          },
          quantity: true,
          expirationDate: true,
        },
      },
    });
  }

  getAllCacheKey(): string[] {
    return [...super.getAllCacheKey(), `${Transaction.name}:latestTransaction`];
  }
}
