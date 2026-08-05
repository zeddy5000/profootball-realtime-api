import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiFootballClient } from './api-football.client';
import { ApiFootballService } from './api-football.service';

@Module({
  imports: [HttpModule],

  providers: [
    ApiFootballClient,
    ApiFootballService,
  ],

  exports: [
    ApiFootballService,
  ],
})
export class ApiFootballModule {}