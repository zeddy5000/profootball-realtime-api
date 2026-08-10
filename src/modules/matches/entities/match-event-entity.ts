import { MatchEventType } from '../enums/match-event-type.enum';

export class MatchEvent {
  id!: string;

  matchId!: string;

  type!: MatchEventType;

  minute!: number;

  team!: string;

  player?: string;

  description?: string;

  createdAt!: Date;
}