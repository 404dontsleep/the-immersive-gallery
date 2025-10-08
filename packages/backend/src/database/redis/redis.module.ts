import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const redis = new Redis({
          host: config.get('REDIS_HOST') || '127.0.0.1',
          port: config.get('REDIS_PORT') || 6379,
          db: 0,
        });

        redis.on('connect', () => console.log('✅ Redis connected'));
        redis.on('error', err => console.error('❌ Redis error:', err));

        return redis;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
