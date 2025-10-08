import { Inject, Injectable } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { SysCron } from './sys-cron.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import { Redis } from 'ioredis';

@Injectable()
export class SysCronService extends createBaseService(SysCron) {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(SysCron) repository: Repository<SysCron>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
  }
}
