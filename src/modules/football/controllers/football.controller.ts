import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FootballService } from '../services/football.service';

@ApiTags('Football')
@Controller({
  path: 'football',
  version: '1',
})
export class FootballController {
  constructor(
    private readonly footballService: FootballService,
  ) {}

  @Get('live')
  @ApiOperation({
    summary: 'Get live matches',
  })
  getLiveMatches() {
    return this.footballService.getLiveMatches();
  }

  @Get('competitions')
  @ApiOperation({
    summary: 'Get competitions',
  })
  getCompetitions() {
    return this.footballService.getCompetitions();
  }

  @Get('fixtures')
  @ApiOperation({
    summary: 'Get fixtures',
  })
  getFixtures(
    @Query('date') date?: string,
  ) {
    return this.footballService.getFixtures(date);
  }

  @Get('fixtures/:id')
  @ApiOperation({
    summary: 'Get fixture by id',
  })
  getFixture(
    @Param('id') id: string,
  ) {
    return this.footballService.getFixture(Number(id));
  }

  @Get('standings/:competition')
  @ApiOperation({
    summary: 'Get standings',
  })
  getStandings(
    @Param('competition') competition: string,
  ) {
    return this.footballService.getStandings(
      competition,
    );
  }
}