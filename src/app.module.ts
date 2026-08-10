import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { validationSchema } from './config/env.validation';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './modules/health/health.module';
import { MatchesModule } from './modules/matches/matches.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { ApiFootballModule } from './infrastructure/api-football/api-football.module';
import { FootballModule } from './modules/football/football.module';
import { FootballProviderModule } from './infrastructure/football-provider/football-provider.module';
import { SimulationModule } from './modules/simulation/simulation.module';

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

    ApiFootballModule,

     FootballModule,

     FootballProviderModule,

     SimulationModule,

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}