import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { createBaseDto } from './base.dto';

export class NumberWhereDto extends createBaseDto(Number) {
  @ApiProperty({
    required: false,
    description: 'Match numbers greater than this value',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gt?: number;

  @ApiProperty({
    required: false,
    description: 'Match numbers less than this value',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lt?: number;

  @ApiProperty({
    required: false,
    description: 'Match numbers greater than or equal to this value',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gte?: number;

  @ApiProperty({
    required: false,
    description: 'Match numbers less than or equal to this value',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lte?: number;
}
