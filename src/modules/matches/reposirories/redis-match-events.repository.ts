import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { MatchEvent } from '../entities/match-event-entity';
import type { IMatchEventsRepository } from './match-events.repository.interface';
import { RedisService } from '../../../infrastructure/redis/redis.service';

@Injectable()
export class RedisMatchEventsRepository
  implements IMatchEventsRepository
{
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async create(event: MatchEvent): Promise<MatchEvent> {
    const matchEvent: MatchEvent = {
      ...event,
      id: event.id || randomUUID(),
      createdAt: event.createdAt || new Date(),
    };

    await this.redisService.set(
      this.eventKey(matchEvent.id),
      matchEvent,
    );

    await this.redisService.set(
      this.matchEventIndexKey(
        matchEvent.matchId,
        matchEvent.id,
      ),
      true,
    );

    return matchEvent;
  }

  async findByMatchId(
    matchId: string,
  ): Promise<MatchEvent[]> {
    const keys = await this.redisService.keys(
      `match:${matchId}:events:*`,
    );

    const events: MatchEvent[] = [];

    for (const key of keys) {
      const eventId = key.substring(
        `match:${matchId}:events:`.length,
      );

      if (!eventId) {
        continue;
      }

      const event = await this.findOne(eventId);

      if (event) {
        events.push(event);
      }
    }

    return events;
  }

  async findOne(
    id: string,
  ): Promise<MatchEvent | null> {
    return this.redisService.get<MatchEvent>(
      this.eventKey(id),
    );
  }

  async delete(id: string): Promise<void> {
    const event = await this.findOne(id);

    if (!event) {
      return;
    }

    await this.redisService.delete(
      this.eventKey(id),
    );

    await this.redisService.delete(
      this.matchEventIndexKey(
        event.matchId,
        event.id,
      ),
    );
  }

  private eventKey(id: string): string {
    return `match-event:${id}`;
  }

  private matchEventIndexKey(
    matchId: string,
    eventId: string,
  ): string {
    return `match:${matchId}:events:${eventId}`;
  }
}