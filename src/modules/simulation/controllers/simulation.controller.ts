import {
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { SimulationService } from '../services/simulation.service';

@Controller('simulation')
export class SimulationController {
  constructor(
    private readonly simulationService: SimulationService,
  ) {}

  @Post(':matchId/start')
  async startMatch(
    @Param('matchId') matchId: string,
  ) {
    return this.simulationService.startMatch(
      matchId,
    );
  }
}