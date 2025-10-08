import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class SysConfigDto<T> {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: Object,
  })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  value: T;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  description: string;

  @ApiProperty()
  @IsArray({
    context: String,
  })
  @Type(() => String)
  @IsOptional()
  allowPermission: string[];
}
