import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { RedisService } from '../../../infrastructure/redis/redis.service';

import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Match } from '../entities/match.entity';
import type { IMatchesRepository } from './matches.repository.interface';
import { MatchStatus } from '../enums/match-status.enum';

@Injectable()
export class RedisMatchesRepository implements IMatchesRepository {
  private readonly MATCH_KEY_PREFIX = 'match';
  private readonly MATCH_SET_KEY = 'matches';

  constructor(
    private readonly redisService: RedisService,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const now = new Date();

    const match: Match = {
      id: uuid(),
      homeTeam: createMatchDto.homeTeam,
      awayTeam: createMatchDto.awayTeam,
      homeScore: 0,
      awayScore: 0,
      minute: 0,
      status: MatchStatus.SCHEDULED,
      createdAt: now,
      updatedAt: now,
    };

    const key = this.getMatchKey(match.id);

    await this.redisService.set(key, match);

    await this.redisService.sadd(
      this.MATCH_SET_KEY,
      match.id,
    );

    return match;
  }

  async findAll(): Promise<Match[]> {
    const ids = await this.redisService.smembers(
      this.MATCH_SET_KEY,
    );

    const matches: Match[] = [];

    for (const id of ids) {
      const match = await this.findOne(id);

      if (match) {
        matches.push(match);
      }
    }

    return matches;
  }

  async findOne(id: string): Promise<Match | null> {
    const key = this.getMatchKey(id);

    return this.redisService.get<Match>(key);
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<Match | null> {
    const existing = await this.findOne(id);

    if (!existing) {
      return null;
    }

    const updated: Match = {
      ...existing,
      ...updateMatchDto,
      updatedAt: new Date(),
    };

    const key = this.getMatchKey(id);

    await this.redisService.set(key, updated);

    return updated;
  }

  async delete(id: string): Promise<void> {
    const key = this.getMatchKey(id);

    await this.redisService.delete(key);

    await this.redisService.srem(
      this.MATCH_SET_KEY,
      id,
    );
  }

  private getMatchKey(id: string): string {
    return `${this.MATCH_KEY_PREFIX}:${id}`;
  }
}