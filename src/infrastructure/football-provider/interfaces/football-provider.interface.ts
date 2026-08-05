export interface FootballProvider {
  getLiveMatches(): Promise<any>;

  getFixtures(date?: string): Promise<any>;

  getFixture(id: number): Promise<any>;

  getCompetitions(): Promise<any>;

  getStandings(
    competition: string,
  ): Promise<any>;
}