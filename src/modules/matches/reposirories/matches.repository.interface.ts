import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Match } from '../entities/match.entity';
import { MatchStateUpdate } from '../interfaces/match-state-update.interface';

export interface IMatchesRepository {
  create(
    createMatchDto: CreateMatchDto,
  ): Promise<Match>;

  findAll(): Promise<Match[]>;

  findOne(
    id: string,
  ): Promise<Match | null>;

  update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<Match | null>;

  updateState(
    id: string,
    update: MatchStateUpdate,
  ): Promise<Match | null>;

  delete(
    id: string,
  ): Promise<void>;
}