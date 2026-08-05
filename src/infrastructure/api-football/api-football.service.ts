import { Injectable } from '@nestjs/common';

import { ApiFootballClient } from './api-football.client';
import { FootballProvider } from './interfaces/football-provider.interface';

@Injectable()
export class ApiFootballService implements FootballProvider {
  constructor(
    private readonly client: ApiFootballClient,
  ) {}

  async getLiveMatches() {
    return this.client.get('/fixtures', {
      live: 'all',
    });
  }

  async getFixtures(date: string) {
    return [];
  }

  async getFixture(id: number) {
    return null;
  }

  async getLeagues() {
    return [];
  }

  async getStandings(
    league: number,
    season: number,
  ) {
    return [];
  }
}