import createBaseService from '@/base/base.service';
import { Language } from './language.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class LanguageService extends createBaseService(Language) {
  constructor(
    @InjectDataSource()
    dataSource: DataSource,
    @InjectRepository(Language)
    repository: Repository<Language>,
    @Inject(REDIS_CLIENT) readonly redis: Redis,
  ) {
    super(dataSource, repository, redis);
  }
}
