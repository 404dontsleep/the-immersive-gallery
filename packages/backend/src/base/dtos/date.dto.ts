import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { createBaseDto } from './base.dto';

export class DateWhereDto extends createBaseDto(Date) {
  @ApiProperty({
    required: false,
    description: 'Match dates greater than this value',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  gt?: Date;

  @ApiProperty({
    required: false,
    description: 'Match dates greater than or equal to this value',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  gte?: Date;

  @ApiProperty({
    required: false,
    description: 'Match dates less than this value',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lt?: Date;

  @ApiProperty({
    required: false,
    description: 'Match dates less than or equal to this value',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lte?: Date;
}
