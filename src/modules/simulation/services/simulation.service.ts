import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { MatchStatus } from '../../matches/enums/match-status.enum';
import { Match } from '../../matches/entities/match.entity';
import { MatchesService } from '../../matches/services/matches.service';

import { MatchSimulationEngineService } from './match-simulation-engine.service';

@Injectable()
export class SimulationService {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly simulationEngine: MatchSimulationEngineService,
  ) {}

  async startMatch(
    matchId: string,
  ): Promise<Match> {
    const match =
      await this.matchesService.findOne(matchId);

    if (
      match.status !== MatchStatus.SCHEDULED
    ) {
      throw new BadRequestException(
        `Match cannot be started because its current status is '${match.status}'.`,
      );
    }

    const updatedMatch =
      await this.matchesService.updateState(
        matchId,
        {
          status: MatchStatus.LIVE,
          minute: 0,
        },
      );

    await this.simulationEngine.start(
      matchId,
    );

    return updatedMatch;
  }
}