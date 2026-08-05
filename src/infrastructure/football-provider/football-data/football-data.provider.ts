import { Injectable } from '@nestjs/common';

import { FootballProvider } from '../interfaces/football-provider.interface';
import { FootballDataClient } from './football-data.client';

@Injectable()
export class FootballDataProvider
  implements FootballProvider
{
  constructor(
    private readonly client: FootballDataClient,
  ) {}

  async getLiveMatches() {
    // Football-Data free tier doesn't support live matches.
    return [];
  }

  async getFixtures(date?: string) {
    return this.client.get('/matches', {
      date,
    });
  }

  async getFixture(id: number) {
    return this.client.get(`/matches/${id}`);
  }

  async getCompetitions() {
    return this.client.get('/competitions');
  }

  async getStandings(
    competition: string,
  ) {
    return this.client.get(
      `/competitions/${competition}/standings`,
    );
  }
}