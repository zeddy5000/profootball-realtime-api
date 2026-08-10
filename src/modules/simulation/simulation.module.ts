import { Module } from '@nestjs/common';

import { MatchesModule } from '../matches/matches.module';

import { SimulationController } from './controllers/simulation.controller';

import { MatchSimulationEngineService } from './services/match-simulation-engine.service';
import { SimulationService } from './services/simulation.service';
import { MatchEventSimulationService } from './services/match-event-simulation.service';
@Module({
  imports: [
    MatchesModule,
  ],

  controllers: [
    SimulationController,
  ],

  providers: [
    SimulationService,
    MatchSimulationEngineService,
    MatchEventSimulationService,
  ],

  exports: [
    SimulationService,
    MatchSimulationEngineService,
  ],
})
export class SimulationModule {}