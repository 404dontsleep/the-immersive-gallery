import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  token: string;
}
