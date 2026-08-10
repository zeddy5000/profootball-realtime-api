import { Module } from '@nestjs/common';

import { MatchesModule } from '../matches/matches.module';
import { SimulationController } from './controllers/simulation.controller';
import { SimulationService } from './services/simulation.service';

@Module({
  imports: [
    MatchesModule,
  ],

  controllers: [
    SimulationController,
  ],

  providers: [
    SimulationService,
  ],

  exports: [
    SimulationService,
  ],
})
export class SimulationModule {}