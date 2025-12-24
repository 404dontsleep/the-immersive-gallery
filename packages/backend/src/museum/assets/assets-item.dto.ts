import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AssetsItemDto {}

export class AssetsItemUnitDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
