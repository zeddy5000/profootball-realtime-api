import { MatchStatus } from '../enums/match-status.enum';
import { MatchEvent } from './match-event-entity';

export class Match {
  id!: string;

  homeTeam!: string;

  awayTeam!: string;

  homeScore!: number;

  awayScore!: number;

  minute!: number;

  status!: MatchStatus;

  events!: MatchEvent[];

  createdAt!: Date;

  updatedAt!: Date;
}