import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MatchEvent } from '../entities/match-event-entity';

import type { IMatchEventsRepository } from '../reposirories/match-events.repository.interface';
import { MATCH_EVENTS_REPOSITORY } from '../reposirories/match-events.token';

@Injectable()
export class MatchEventsService {
  constructor(
    @Inject(MATCH_EVENTS_REPOSITORY)
    private readonly matchEventsRepository: IMatchEventsRepository,
  ) {}

  async create(event: MatchEvent): Promise<MatchEvent> {
    return this.matchEventsRepository.create(event);
  }

  async findByMatchId(
    matchId: string,
  ): Promise<MatchEvent[]> {
    return this.matchEventsRepository.findByMatchId(matchId);
  }

  async findOne(id: string): Promise<MatchEvent> {
    const event =
      await this.matchEventsRepository.findOne(id);

    if (!event) {
      throw new NotFoundException(
        `Match event with ID '${id}' not found.`,
      );
    }

    return event;
  }

  async remove(id: string): Promise<void> {
    const event =
      await this.matchEventsRepository.findOne(id);

    if (!event) {
      throw new NotFoundException(
        `Match event with ID '${id}' not found.`,
      );
    }

    await this.matchEventsRepository.delete(id);
  }
}