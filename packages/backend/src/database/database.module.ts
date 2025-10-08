import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './data.source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...(dataSourceConfig as any),
        cache: {
          type: 'ioredis',
          options: {
            host: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT'),
          },
          duration: 30 * 1000,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
