import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @IsOptional()
  email?: string;
}
