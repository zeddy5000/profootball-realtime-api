import { Injectable, Logger } from '@nestjs/common';

import { MatchStatus } from '../../matches/enums/match-status.enum';
import { MatchesService } from '../../matches/services/matches.service';

import { MatchEventSimulationService } from './match-event-simulation.service';
import { SimulationPhase } from '../enum/simulation-phase.enum';

@Injectable()
export class MatchSimulationEngineService {
  private readonly logger =
    new Logger(MatchSimulationEngineService.name);

  private readonly simulations =
    new Map<string, NodeJS.Timeout>();

  private readonly phases =
    new Map<string, SimulationPhase>();

  // 1 simulated minute = 1 real second
  private readonly TICK_INTERVAL_MS = 1000;

  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchEventSimulationService: MatchEventSimulationService,
  ) {}

  async start(matchId: string): Promise<void> {
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

    /*
     * Determine the starting phase based on
     * the current match minute.
     */
    const phase = this.getPhase(match.minute);

    this.phases.set(
      matchId,
      phase,
    );

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
      `Simulation started for match ${matchId} in phase ${phase}.`,
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
    this.phases.delete(matchId);

    this.logger.log(
      `Simulation stopped for match ${matchId}.`,
    );
  }

  private async tick(
    matchId: string,
  ): Promise<void> {
    try {
      const match =
        await this.matchesService.findOne(matchId);

      /*
       * Handle halftime separately.
       */
      if (match.status === MatchStatus.HALFTIME) {
        await this.handleHalftime(matchId);
        return;
      }

      /*
       * Stop if the match is no longer live.
       */
      if (match.status !== MatchStatus.LIVE) {
        await this.stop(matchId);
        return;
      }

      const nextMinute =
        match.minute + 1;

      /*
       * First half ends at minute 45.
       */
      if (nextMinute === 45) {
        await this.matchesService.updateState(
          matchId,
          {
            minute: 45,
            status: MatchStatus.HALFTIME,
          },
        );

        this.phases.set(
          matchId,
          SimulationPhase.HALFTIME,
        );

        this.logger.log(
          `Match ${matchId} reached halftime.`,
        );

        return;
      }

      /*
       * Second half ends at minute 90.
       */
      if (nextMinute >= 90) {
        await this.matchesService.updateState(
          matchId,
          {
            minute: 90,
            status: MatchStatus.FINISHED,
          },
        );

        this.phases.set(
          matchId,
          SimulationPhase.FINISHED,
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
       * Update the simulation phase.
       */
      const phase =
        this.getPhase(nextMinute);

      this.phases.set(
        matchId,
        phase,
      );

      /*
       * Generate match events.
       */
      await this.matchEventSimulationService.simulate(
        updatedMatch,
      );

      this.logger.debug(
        `Match ${matchId} → minute ${nextMinute} (${phase}).`,
      );
    } catch (error) {
      this.logger.error(
        `Simulation tick failed for match ${matchId}.`,
        error,
      );

      await this.stop(matchId);
    }
  }

  private async handleHalftime(
    matchId: string,
  ): Promise<void> {
    /*
     * For now, halftime lasts one real tick.
     *
     * Since one tick represents one simulated minute,
     * the next tick resumes the second half at minute 46.
     */
    const match =
      await this.matchesService.findOne(matchId);

    await this.matchesService.updateState(
      matchId,
      {
        minute: match.minute + 1,
        status: MatchStatus.LIVE,
      },
    );

    this.phases.set(
      matchId,
      SimulationPhase.SECOND_HALF,
    );

    this.logger.log(
      `Match ${matchId} resumed for the second half.`,
    );
  }

  private getPhase(
    minute: number,
  ): SimulationPhase {
    if (minute < 45) {
      return SimulationPhase.FIRST_HALF;
    }

    if (minute === 45) {
      return SimulationPhase.HALFTIME;
    }

    if (minute < 90) {
      return SimulationPhase.SECOND_HALF;
    }

    return SimulationPhase.FINISHED;
  }
}