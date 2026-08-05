import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Match } from '../entities/match.entity';
import { MatchStatus } from '../enums/match-status.enum';
import { IMatchesRepository } from './matches.repository.interface';

@Injectable()
export class InMemoryMatchesRepository implements IMatchesRepository {
  private readonly matches: Match[] = [];

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = new Match();

    match.id = randomUUID();
    match.homeTeam = createMatchDto.homeTeam;
    match.awayTeam = createMatchDto.awayTeam;
    match.homeScore = 0;
    match.awayScore = 0;
    match.minute = 0;
    match.status = MatchStatus.SCHEDULED;
    match.createdAt = new Date();
    match.updatedAt = new Date();

    this.matches.push(match);

    return match;
  }

  async findAll(): Promise<Match[]> {
    return this.matches;
  }

  async findOne(id: string): Promise<Match | null> {
    return this.matches.find(match => match.id === id) ?? null;
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<Match | null> {
    const match = await this.findOne(id);

    if (!match) {
      return null;
    }

    Object.assign(match, updateMatchDto);

    match.updatedAt = new Date();

    return match;
  }

  async delete(id: string): Promise<void> {
    const index = this.matches.findIndex(match => match.id === id);

    if (index !== -1) {
      this.matches.splice(index, 1);
    }
  }
}