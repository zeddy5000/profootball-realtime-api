import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
} from 'class-validator';

import { MatchEventType } from '../enums/match-event-type.enum';

export class CreateMatchEventDto {
  @ApiProperty({
    example: 'goal',
    enum: MatchEventType,
    description: 'Type of match event',
  })
  @IsEnum(MatchEventType)
  type!: MatchEventType;

  @ApiProperty({
    example: 34,
    description: 'Minute at which the event occurred',
  })
  @IsInt()
  @Min(0)
  minute!: number;

  @ApiProperty({
    example: 'Chelsea',
    description: 'Team involved in the event',
  })
  @IsString()
  @IsNotEmpty()
  team!: string;

  @ApiProperty({
    example: 'Cole Palmer',
    required: false,
    description: 'Player involved in the event',
  })
  @IsOptional()
  @IsString()
  player?: string;

  @ApiProperty({
    example: 'Chelsea scored from a counter attack',
    required: false,
    description: 'Additional information about the event',
  })
  @IsOptional()
  @IsString()
  description?: string;
}