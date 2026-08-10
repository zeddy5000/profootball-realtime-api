import { Injectable } from '@nestjs/common';

import { Server } from 'socket.io';

import { Match } from '../../matches/entities/match.entity';
import { MatchEvent } from '../../matches/entities/match-event-entity';

@Injectable()
export class RealtimeService {
  private server?: Server;

  setServer(server: Server): void {
    this.server = server;
  }

  broadcastScoreUpdate(
    match: Match,
  ): void {
    if (!this.server) {
      return;
    }

    this.server
      .to(this.matchRoom(match.id))
      .emit('score_update', {
        matchId: match.id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        minute: match.minute,
        status: match.status,
      });
  }

  broadcastMatchEvent(
    event: MatchEvent,
  ): void {
    if (!this.server) {
      return;
    }

    this.server
      .to(this.matchRoom(event.matchId))
      .emit('match_event', {
        id: event.id,
        matchId: event.matchId,
        type: event.type,
        minute: event.minute,
        team: event.team,
        player: event.player,
        description: event.description,
        createdAt: event.createdAt,
      });
  }

  broadcastStatsUpdate(
    matchId: string,
    stats: Record<string, unknown>,
  ): void {
    if (!this.server) {
      return;
    }

    this.server
      .to(this.matchRoom(matchId))
      .emit('stats_update', {
        matchId,
        stats,
      });
  }

  private matchRoom(
    matchId: string,
  ): string {
    return `match:${matchId}`;
  }
}