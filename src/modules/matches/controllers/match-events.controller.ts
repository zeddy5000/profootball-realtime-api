import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateMatchEventDto } from '../dto/create-match-event.dto';
import { MatchEvent } from '../entities/match-event-entity';
import { MatchEventsService } from '../services/match-events.service';

@ApiTags('Match Events')
@Controller({
  path: 'matches/:matchId/events',
  version: '1',
})
export class MatchEventsController {
  constructor(
    private readonly matchEventsService: MatchEventsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a match event',
  })
  @ApiResponse({
    status: 201,
    description: 'Match event created successfully.',
  })
  create(
    @Param('matchId') matchId: string,
    @Body() dto: CreateMatchEventDto,
  ) {
    const event: MatchEvent = {
      id: '',
      matchId,
      type: dto.type,
      minute: dto.minute,
      team: dto.team,
      player: dto.player,
      description: dto.description,
      createdAt: new Date(),
    };

    return this.matchEventsService.create(event);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all events for a match',
  })
  @ApiResponse({
    status: 200,
    description: 'Match events retrieved successfully.',
  })
  findByMatchId(@Param('matchId') matchId: string) {
    return this.matchEventsService.findByMatchId(matchId);
  }

  @Get(':eventId')
  @ApiOperation({
    summary: 'Retrieve a single match event',
  })
  @ApiResponse({
    status: 200,
    description: 'Match event retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Match event not found.',
  })
  findOne(@Param('eventId') eventId: string) {
    return this.matchEventsService.findOne(eventId);
  }

  @Delete(':eventId')
  @ApiOperation({
    summary: 'Delete a match event',
  })
  @ApiResponse({
    status: 200,
    description: 'Match event deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Match event not found.',
  })
  remove(@Param('eventId') eventId: string) {
    return this.matchEventsService.remove(eventId);
  }
}