import { Injectable, Logger } from '@nestjs/common';

import { MatchStatus } from '../../matches/enums/match-status.enum';
import { MatchesService } from '../../matches/services/matches.service';

import { MatchEventSimulationService } from './match-event-simulation.service';

@Injectable()
export class MatchSimulationEngineService {
  private readonly logger =
    new Logger(MatchSimulationEngineService.name);

  private readonly simulations =
    new Map<string, NodeJS.Timeout>();

  // Development setting:
  // 1 simulated minute = 1 real second.
  private readonly TICK_INTERVAL_MS = 1000;

  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchEventSimulationService: MatchEventSimulationService,
  ) {}

  async start(matchId: string): Promise<void> {
    // Prevent the same match from being simulated more than once.
    if (this.simulations.has(matchId)) {
      this.logger.warn(
        `Match ${matchId} is already being simulated.`,
      );

      return;
    }

    const match =
      await this.matchesService.findOne(matchId);

    if (match.status !== MatchStatus.LIVE) {
      throw new Error(
        `Match ${matchId} must be live before starting the simulation.`,
      );
    }

    const timer = setInterval(
      () => {
        void this.tick(matchId);
      },
      this.TICK_INTERVAL_MS,
    );

    this.simulations.set(
      matchId,
      timer,
    );

    this.logger.log(
      `Simulation started for match ${matchId}`,
    );
  }

  async stop(matchId: string): Promise<void> {
    const timer =
      this.simulations.get(matchId);

    if (!timer) {
      return;
    }

    clearInterval(timer);

    this.simulations.delete(matchId);

    this.logger.log(
      `Simulation stopped for match ${matchId}`,
    );
  }

  private async tick(
    matchId: string,
  ): Promise<void> {
    try {
      const match =
        await this.matchesService.findOne(matchId);

      if (match.status !== MatchStatus.LIVE) {
        await this.stop(matchId);
        return;
      }

      const nextMinute =
        match.minute + 1;

      /*
       * End the match at 90 minutes.
       */
      if (nextMinute >= 90) {
        await this.matchesService.updateState(
          matchId,
          {
            minute: 90,
            status: MatchStatus.FINISHED,
          },
        );

        await this.stop(matchId);

        this.logger.log(
          `Match ${matchId} finished.`,
        );

        return;
      }

      /*
       * Update the match clock.
       */
      const updatedMatch =
        await this.matchesService.updateState(
          matchId,
          {
            minute: nextMinute,
          },
        );

      /*
       * Give the event simulation service
       * an opportunity to generate an event.
       */
      await this.matchEventSimulationService.simulate(
        updatedMatch,
      );

      this.logger.debug(
        `Match ${matchId} → minute ${nextMinute}`,
      );
    } catch (error) {
      this.logger.error(
        `Simulation tick failed for match ${matchId}`,
        error,
      );

      await this.stop(matchId);
    }
  }
}