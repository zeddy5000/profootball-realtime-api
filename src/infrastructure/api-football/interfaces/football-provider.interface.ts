export interface FootballProvider {
  getLiveMatches(): Promise<unknown>;

  getFixtures(date: string): Promise<unknown>;

  getFixture(id: number): Promise<unknown>;

  getLeagues(): Promise<unknown>;

  getStandings(league: number, season: number): Promise<unknown>;
}