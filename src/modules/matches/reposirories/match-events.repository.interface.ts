import { MatchEvent } from '../entities/match-event-entity';

export interface IMatchEventsRepository {
  create(event: MatchEvent): Promise<MatchEvent>;

  findByMatchId(matchId: string): Promise<MatchEvent[]>;

  findOne(id: string): Promise<MatchEvent | null>;

  delete(id: string): Promise<void>;
}