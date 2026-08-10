import { MatchEvent } from '../entities/match-event-entity';
import { MatchStatus } from '../enums/match-status.enum';

export interface IMatch {
  id: string;

  homeTeam: string;
  awayTeam: string;

  homeScore: number;
  awayScore: number;

  minute: number;

  status: MatchStatus;

  events: MatchEvent[];

  createdAt: Date;
  updatedAt: Date;
}