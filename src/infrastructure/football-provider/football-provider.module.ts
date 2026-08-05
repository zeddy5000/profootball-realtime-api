import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';


import { FootballDataClient } from './football-data/football-data.client';
import { FootballDataProvider } from './football-data/football-data.provider';

import { FOOTBALL_PROVIDER } from './tokens/football-provider.token';

@Module({
  imports: [HttpModule],

  providers: [
    FootballDataClient,

    FootballDataProvider,

    {
      provide: FOOTBALL_PROVIDER,
      useExisting: FootballDataProvider,
    },
  ],

  exports: [FOOTBALL_PROVIDER],
})
export class FootballProviderModule {}