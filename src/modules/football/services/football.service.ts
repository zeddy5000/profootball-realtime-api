import { Inject, Injectable } from '@nestjs/common';

import type { FootballProvider } from '../../../infrastructure/football-provider/interfaces/football-provider.interface';
import { FOOTBALL_PROVIDER } from '../../../infrastructure/football-provider/tokens/football-provider.token';

@Injectable()
export class FootballService {
  constructor(
    @Inject(FOOTBALL_PROVIDER)
    private readonly provider: FootballProvider,
  ) {}

  async getLiveMatches() {
    return this.provider.getLiveMatches();
  }

  async getFixtures(date?: string) {
    return this.provider.getFixtures(date);
  }

  async getFixture(id: number) {
    return this.provider.getFixture(id);
  }

  async getCompetitions() {
    return this.provider.getCompetitions();
  }

  async getStandings(competition: string) {
    return this.provider.getStandings(competition);
  }
}