export interface FootballProvider {
  getLiveMatches(): Promise<unknown>;
  getFixtures(date: string): Promise<unknown>;
  getMatch(id: number): Promise<unknown>;
}