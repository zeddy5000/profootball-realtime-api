import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { validationSchema } from './config/env.validation';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './modules/health/health.module';
import { MatchesModule } from './modules/matches/matches.module';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema,
      envFilePath: '.env',
    }),

    RedisModule,

    HealthModule,

    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}