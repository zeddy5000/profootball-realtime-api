import { MatchStatus } from '../enums/match-status.enum';

export interface IMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
}