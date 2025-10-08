import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { createBaseDto } from './base.dto';

export class StringWhereDto extends createBaseDto(String) {
  @ApiProperty({
    required: false,
    description: 'Search for strings containing this substring',
  })
  @IsOptional()
  @IsString()
  contains?: string;
}
