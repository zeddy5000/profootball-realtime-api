import { Module } from '@nestjs/common';

import { FootballProviderModule } from '../../infrastructure/football-provider/football-provider.module';

import { FootballController } from './controllers/football.controller';
import { FootballService } from './services/football.service';

@Module({
  imports: [FootballProviderModule],

  controllers: [FootballController],

  providers: [FootballService],
})
export class FootballModule {}