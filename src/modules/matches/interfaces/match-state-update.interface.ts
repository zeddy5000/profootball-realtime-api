import { MatchStatus } from '../enums/match-status.enum';

export interface MatchStateUpdate {
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  status?: MatchStatus;
}