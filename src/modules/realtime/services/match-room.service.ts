import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchRoomService {
  private readonly subscriptions =
    new Map<string, Set<string>>();

  subscribe(
    matchId: string,
    clientId: string,
  ): void {
    let clients =
      this.subscriptions.get(matchId);

    if (!clients) {
      clients = new Set<string>();

      this.subscriptions.set(
        matchId,
        clients,
      );
    }

    clients.add(clientId);
  }

  unsubscribe(
    matchId: string,
    clientId: string,
  ): void {
    const clients =
      this.subscriptions.get(matchId);

    if (!clients) {
      return;
    }

    clients.delete(clientId);

    if (clients.size === 0) {
      this.subscriptions.delete(matchId);
    }
  }

  removeClient(
    clientId: string,
  ): void {
    for (const [matchId, clients] of this.subscriptions) {
      clients.delete(clientId);

      if (clients.size === 0) {
        this.subscriptions.delete(matchId);
      }
    }
  }

  getSubscribers(
    matchId: string,
  ): string[] {
    return Array.from(
      this.subscriptions.get(matchId) ?? [],
    );
  }

  isSubscribed(
    matchId: string,
    clientId: string,
  ): boolean {
    return (
      this.subscriptions
        .get(matchId)
        ?.has(clientId) ?? false
    );
  }
}