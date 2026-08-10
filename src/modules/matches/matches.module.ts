import { Module } from '@nestjs/common';

import { MatchesController } from './controllers/matches.controller';

import { RedisMatchesRepository } from './reposirories/redis-matches.repository';
import { RedisMatchEventsRepository } from './reposirories/redis-match-events.repository';

import { MATCHES_REPOSITORY } from './reposirories/matches.tokens';
import { MATCH_EVENTS_REPOSITORY } from './reposirories/match-events.token';

import { MatchesService } from './services/matches.service';

import { MatchEventsService } from './services/match-events.service';
import { MatchEventsController } from './controllers/match-events.controller';

@Module({
  controllers: [MatchesController, MatchEventsController],

  providers: [
    MatchesService,
    MatchEventsService,

    {
      provide: MATCHES_REPOSITORY,
      useClass: RedisMatchesRepository,
    },

    {
      provide: MATCH_EVENTS_REPOSITORY,
      useClass: RedisMatchEventsRepository,
    },
  ],

  exports: [
    MatchesService,
    MATCH_EVENTS_REPOSITORY,
  ],
})
export class MatchesModule {}