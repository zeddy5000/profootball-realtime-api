import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { MatchRoomService } from '../services/match-room.service';
import { RealtimeService } from '../services/realtime.service';

@WebSocketGateway({
  namespace: '/matches',

  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },

  transports: ['websocket', 'polling'],
})
export class MatchGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly matchRoomService: MatchRoomService,
    private readonly realtimeService: RealtimeService,
  ) {}

  /**
   * Called when the Socket.IO server has been initialized.
   */
  afterInit(server: Server): void {
    this.realtimeService.setServer(server);

    console.log(
      'Match WebSocket gateway initialized.',
    );
  }

  /**
   * Called whenever a client connects.
   */
  handleConnection(client: Socket): void {
    console.log(
      `WebSocket client connected: ${client.id}`,
    );
  }

  /**
   * Called whenever a client disconnects.
   */
  handleDisconnect(client: Socket): void {
    this.matchRoomService.removeClient(
      client.id,
    );

    console.log(
      `WebSocket client disconnected: ${client.id}`,
    );
  }

  /**
   * Subscribe a client to a specific match.
   *
   * Event:
   * subscribe_match
   *
   * Payload:
   * {
   *   matchId: string;
   * }
   */
  @SubscribeMessage('subscribe_match')
  handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { matchId: string },
  ) {
    if (
      !payload ||
      typeof payload.matchId !== 'string' ||
      !payload.matchId.trim()
    ) {
      return {
        event: 'error',
        data: {
          message: 'matchId is required.',
        },
      };
    }

    const matchId = payload.matchId.trim();

    this.matchRoomService.subscribe(
      matchId,
      client.id,
    );

    client.join(`match:${matchId}`);

    return {
      event: 'match_subscribed',
      data: {
        matchId,
      },
    };
  }

  /**
   * Unsubscribe a client from a specific match.
   *
   * Event:
   * unsubscribe_match
   *
   * Payload:
   * {
   *   matchId: string;
   * }
   */
  @SubscribeMessage('unsubscribe_match')
  handleUnsubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { matchId: string },
  ) {
    if (
      !payload ||
      typeof payload.matchId !== 'string' ||
      !payload.matchId.trim()
    ) {
      return {
        event: 'error',
        data: {
          message: 'matchId is required.',
        },
      };
    }

    const matchId = payload.matchId.trim();

    this.matchRoomService.unsubscribe(
      matchId,
      client.id,
    );

    client.leave(`match:${matchId}`);

    return {
      event: 'match_unsubscribed',
      data: {
        matchId,
      },
    };
  }

  /**
   * TEMPORARY DEVELOPMENT TEST
   *
   * Broadcasts a stats update to subscribers
   * of test-match-123.
   *
   * We will remove this after testing.
   */
 @SubscribeMessage('test_broadcast')
handleTestBroadcast(
  @MessageBody()
  payload: { matchId: string },
) {
  const matchId =
    payload?.matchId?.trim();

  if (!matchId) {
    return {
      event: 'error',
      data: {
        message: 'matchId is required.',
      },
    };
  }

  this.realtimeService.broadcastStatsUpdate(
    matchId,
    {
      possession: {
        home: 55,
        away: 45,
      },

      shots: {
        home: 8,
        away: 4,
      },
    },
  );

  return {
    event: 'broadcast_sent',
    data: {
      matchId,
    },
  };
}
}