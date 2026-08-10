import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { MatchesService } from '../../matches/services/matches.service';
import { MatchStatus } from '../../matches/enums/match-status.enum';
import { Match } from '../../matches/entities/match.entity';

@Injectable()
export class SimulationService {
  constructor(
    private readonly matchesService: MatchesService,
  ) {}

  async startMatch(
    matchId: string,
  ): Promise<Match> {
    const match =
      await this.matchesService.findOne(matchId);

    if (!match) {
      throw new NotFoundException(
        `Match with ID '${matchId}' not found.`,
      );
    }

    if (
      match.status !== MatchStatus.SCHEDULED
    ) {
      throw new BadRequestException(
        `Match cannot be started because its current status is '${match.status}'.`,
      );
    }

    return this.matchesService.updateState(
      matchId,
      {
        status: MatchStatus.LIVE,
        minute: 0,
      },
    );
  }
}