import { Global, Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    NestRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        options: {
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port'),
          password:
            config.get<string>('redis.password') || undefined,
          db: config.get<number>('redis.db'),
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService, NestRedisModule],
})
export class RedisModule {}