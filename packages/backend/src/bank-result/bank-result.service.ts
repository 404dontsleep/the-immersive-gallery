import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { BankResult } from './entities/bank-result.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import { Redis } from 'ioredis';

@Injectable()
export class BankResultService extends createBaseService(BankResult) {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(BankResult) repository: Repository<BankResult>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
  }

  findAll(options?: FindManyOptions<BankResult>): Promise<BankResult[]> {
    return super.findAll({
      ...options,
      order: {
        id: 'DESC',
        transactionDate: 'DESC',
      },
      relations: {
        bank: true,
      },
      select: {
        bank: {
          id: true,
          name: true,
        },
      },
    });
  }

  async toggleProcessed(id: number) {
    const bankResult = await this.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        isProcessed: true,
      },
    });
    if (!bankResult) {
      throw new NotFoundException('Bank result not found');
    }
    bankResult.isProcessed = !bankResult.isProcessed;
    await this.update(id, {
      isProcessed: bankResult.isProcessed,
    });
  }
}
