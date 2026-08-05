import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({
    example: 'Chelsea',
    description: 'Home team name',
  })
  @IsString()
  @IsNotEmpty()
  homeTeam!: string;

  @ApiProperty({
    example: 'Arsenal',
    description: 'Away team name',
  })
  @IsString()
  @IsNotEmpty()
  awayTeam!: string;
}