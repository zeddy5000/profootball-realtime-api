import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { MatchesService } from '../services/matches.service';
import { UpdateMatchStateDto } from '../dto/update-match-state.dto';

@ApiTags('Matches')
@Controller({
  path: 'matches',
  version: '1',
})
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new football match' })
  @ApiResponse({
    status: 201,
    description: 'Match created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed.',
  })
  create(@Body() dto: CreateMatchDto) {
    return this.matchesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all matches' })
  @ApiResponse({
    status: 200,
    description: 'Matches retrieved successfully.',
  })
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single match' })
  @ApiResponse({
    status: 200,
    description: 'Match retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Match not found.',
  })
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a match' })
  @ApiResponse({
    status: 200,
    description: 'Match updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Match not found.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMatchDto,
  ) {
    return this.matchesService.update(id, dto);
  }

  @Patch(':id/state')
@ApiOperation({
  summary: 'Update the live state of a match',
})
@ApiResponse({
  status: 200,
  description: 'Match state updated successfully.',
})
@ApiResponse({
  status: 404,
  description: 'Match not found.',
})
updateState(
  @Param('id') id: string,
  @Body() dto: UpdateMatchStateDto,
) {
  return this.matchesService.updateState(
    id,
    dto,
  );
}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a match' })
  @ApiResponse({
    status: 200,
    description: 'Match deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Match not found.',
  })
  remove(@Param('id') id: string) {
    return this.matchesService.remove(id);
  }
}