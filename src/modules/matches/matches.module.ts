import { Module } from '@nestjs/common';

import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';

import { MATCHES_REPOSITORY } from './reposirories/matches.tokens';
import { RedisMatchesRepository } from './reposirories/redis-matches.repository';

@Module({
  controllers: [MatchesController],
  providers: [
    MatchesService,
    RedisMatchesRepository,
    {
      provide: MATCHES_REPOSITORY,
      useClass: RedisMatchesRepository,
    },
  ],
})
export class MatchesModule {}