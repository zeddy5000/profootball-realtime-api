import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

import { MatchStatus } from '../enums/match-status.enum';

export class UpdateMatchStateDto {
  @ApiPropertyOptional({
    example: 23,
    description: 'Current simulated match minute.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  minute?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Home team score.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  homeScore?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Away team score.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  awayScore?: number;

  @ApiPropertyOptional({
    enum: MatchStatus,
    example: MatchStatus.LIVE,
    description: 'Current match status.',
  })
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;
}