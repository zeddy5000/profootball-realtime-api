import { Match } from '../entities/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';

export interface IMatchesRepository {
  create(createMatchDto: CreateMatchDto): Promise<Match>;

  findAll(): Promise<Match[]>;

  findOne(id: string): Promise<Match | null>;

  update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match | null>;

  delete(id: string): Promise<void>;
}


