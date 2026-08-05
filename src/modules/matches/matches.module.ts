import { Module } from '@nestjs/common';

import { MatchesController } from './controllers/matches.controller';
import { InMemoryMatchesRepository } from './reposirories/in-memory-matches.repository';
import { MATCHES_REPOSITORY } from './reposirories/matches.tokens';
import { MatchesService } from './services/matches.service';



@Module({
  controllers: [MatchesController],
  providers: [
    MatchesService,
    {
      provide: MATCHES_REPOSITORY,
      useClass: InMemoryMatchesRepository,
    },
  ],
  exports: [MatchesService],
})
export class MatchesModule {}