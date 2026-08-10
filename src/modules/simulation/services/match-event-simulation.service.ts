import { Injectable } from '@nestjs/common';

import { Match } from '../../matches/entities/match.entity';
import { MatchEvent } from '../../matches/entities/match-event-entity';
import { MatchEventType } from '../../matches/enums/match-event-type.enum';
import { MatchEventsService } from '../../matches/services/match-events.service';
import { MatchesService } from '../../matches/services/matches.service';

@Injectable()
export class MatchEventSimulationService {
  // Approximate probability of a goal occurring on each simulated minute.
  private readonly GOAL_PROBABILITY = 0.03;

  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchEventsService: MatchEventsService,
  ) {}

  async simulate(
    match: Match,
  ): Promise<void> {
    const shouldScore =
      Math.random() < this.GOAL_PROBABILITY;

    if (!shouldScore) {
      return;
    }

    await this.simulateGoal(match);
  }

  private async simulateGoal(
    match: Match,
  ): Promise<void> {
    const isHomeTeam =
      Math.random() < 0.5;

    const scoringTeam = isHomeTeam
      ? match.homeTeam
      : match.awayTeam;

    const player =
      this.generatePlayerName();

    const event: MatchEvent = {
      id: '',
      matchId: match.id,
      type: MatchEventType.GOAL,
      minute: match.minute,
      team: scoringTeam,
      player,
      description: `${scoringTeam} scored.`,
      createdAt: new Date(),
    };

    await this.matchEventsService.create(
      event,
    );

    await this.matchesService.updateState(
      match.id,
      {
        homeScore: isHomeTeam
          ? match.homeScore + 1
          : match.homeScore,

        awayScore: isHomeTeam
          ? match.awayScore
          : match.awayScore + 1,
      },
    );
  }

  private generatePlayerName(): string {
    const players = [
      'John Smith',
      'Daniel James',
      'Michael Brown',
      'Alex Johnson',
      'James Wilson',
      'David Williams',
      'Robert Taylor',
      'Chris Anderson',
      'Samuel Thomas',
      'William Moore',
    ];

    const index = Math.floor(
      Math.random() * players.length,
    );

    return players[index];
  }
}