import { BadRequestException, Inject, Type } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { generateHash } from './utils/generateHash';
import { REDIS_CLIENT } from '@/database/redis/redis.module';
import Redis from 'ioredis';

export interface IBaseService<T extends BaseEntity> {
  create(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: DeepPartial<T>): Promise<T>;
  delete(id: number): Promise<void>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findById(id: number): Promise<T>;
  count(options?: FindManyOptions<T>): Promise<number>;
  findOne(options?: FindOneOptions<T>): Promise<T>;
  repository: Repository<T>;
  dataSource: DataSource;
  clearCacheByPrefix(
    prefix: string | string[],
    wildCard?: boolean,
  ): Promise<void>;
  checkLocked(id: number): Promise<void>;
  clearAllCache(): Promise<void>;
  getAllCacheKey(): string[];
  CACHE_TTL: number;
  softDelete(id: number): Promise<void>;
  PERFIX: string;
}

export default function createBaseService<T extends BaseEntity>(
  model: Type<T>,
): Type<IBaseService<T>> {
  class BaseService implements IBaseService<T> {
    public PERFIX = `${model.name}`;
    public FIND_ONE_KEY = `${this.PERFIX}:findOne`;
    public FIND_ALL_KEY = `${this.PERFIX}:findAll`;
    public COUNT_KEY = `${this.PERFIX}:count`;
    public CACHE_TTL = 60 * 60 * 1000; // 1 hour
    public repository: Repository<T>;
    public dataSource: DataSource;
    constructor(
      @InjectDataSource()
      dataSource: DataSource,
      @InjectRepository(model)
      repository: Repository<T>,
      @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) {
      this.repository = repository;
      this.dataSource = dataSource;
    }

    getAllCacheKey(): string[] {
      return [this.FIND_ONE_KEY, this.FIND_ALL_KEY, this.COUNT_KEY];
    }

    async clearCacheByPrefix(prefix: string | string[], wildCard?: boolean) {
      const keys = [];
      if (Array.isArray(prefix)) {
        keys.push(...prefix);
      } else {
        keys.push(prefix);
      }
      for (const key of keys) {
        const keys = await this.redis.keys(`${key}${wildCard ? ':*' : ''}`);
        if (keys.length > 0) {
          await this.redis.del(keys);
        }
      }
    }

    async clearAllCache() {
      await this.clearCacheByPrefix(this.getAllCacheKey(), true);
    }

    async create(data: DeepPartial<T>, autoClearCache = true): Promise<T> {
      if (autoClearCache) {
        await this.clearAllCache();
      }
      return this.repository.save(data);
    }

    async findOne(options?: FindOneOptions<T>): Promise<T> {
      return this.repository.findOne({
        ...options,
        cache: {
          id: `${this.FIND_ONE_KEY}:${generateHash(options)}`,
          milliseconds: this.CACHE_TTL,
        },
      });
    }

    async update(
      id: number,
      data: DeepPartial<T>,
      autoClearCache = true,
    ): Promise<any> {
      if (autoClearCache) {
        await this.clearAllCache();
      }
      await this.repository.update(id, data as any);
    }

    async delete(id: number, autoClearCache = true): Promise<void> {
      if (autoClearCache) {
        await this.clearAllCache();
      }
      await this.repository.delete(id);
    }

    async softDelete(id: number, autoClearCache = true): Promise<void> {
      if (autoClearCache) {
        await this.clearAllCache();
      }
      await this.repository.softDelete(id);
    }

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
      const result = await this.repository.find({
        // @ts-ignore
        order: {
          id: 'ASC',
        },
        ...options,
        cache: {
          id: `${this.FIND_ALL_KEY}:${generateHash(options)}`,
          milliseconds: this.CACHE_TTL,
        },
      });

      return result;
    }

    async count(options?: FindManyOptions<T>): Promise<number> {
      return this.repository.count({
        ...options,
        cache: {
          id: `${this.COUNT_KEY}:${generateHash(options)}`,
          milliseconds: this.CACHE_TTL,
        },
      });
    }

    async findById(id: number): Promise<T> {
      const options = {
        where: { id: id as any },
      };
      return this.repository.findOne({
        ...options,
        cache: {
          id: `${this.FIND_ONE_KEY}:${generateHash(options)}`,
          milliseconds: this.CACHE_TTL,
        },
      });
    }

    async checkLocked(id: number): Promise<void> {
      const entity = await this.repository.findOneBy({
        id: id as any,
      });
      if (entity.isLocked) {
        throw new BadRequestException('Entity is locked');
      }
    }
  }

  return BaseService;
}
