import { Module } from '@nestjs/common';

import { MatchGateway } from './gateways/match.gateway';
import { MatchRoomService } from './services/match-room.service';
import { RealtimeService } from './services/realtime.service';

@Module({
  providers: [
    MatchGateway,
    MatchRoomService,
    RealtimeService,
  ],

  exports: [
    MatchGateway,
    MatchRoomService,
    RealtimeService,
  ],
})
export class RealtimeModule {}