import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Match } from '../entities/match.entity';
import type { IMatchesRepository } from '../reposirories/matches.repository.interface';
import { MATCHES_REPOSITORY } from '../reposirories/matches.tokens';

@Injectable()
export class MatchesService {
  constructor(
    @Inject(MATCHES_REPOSITORY)
    private readonly matchesRepository: IMatchesRepository,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchesRepository.create(createMatchDto);
  }

  async findAll(): Promise<Match[]> {
    return this.matchesRepository.findAll();
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchesRepository.findOne(id);

    if (!match) {
      throw new NotFoundException(`Match with ID '${id}' not found.`);
    }

    return match;
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<Match> {
    const match = await this.matchesRepository.update(
      id,
      updateMatchDto,
    );

    if (!match) {
      throw new NotFoundException(`Match with ID '${id}' not found.`);
    }

    return match;
  }

  async remove(id: string): Promise<void> {
    const match = await this.matchesRepository.findOne(id);

    if (!match) {
      throw new NotFoundException(`Match with ID '${id}' not found.`);
    }

    await this.matchesRepository.delete(id);
  }
}