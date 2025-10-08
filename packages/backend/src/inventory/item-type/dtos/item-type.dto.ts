import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ItemTypeDto {
  @ApiProperty({
    description: 'ID của loại vật phẩm',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiProperty({
    description: 'Tên loại vật phẩm',
    example: 'Vũ khí',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;

  @ApiProperty({
    description: 'Mô tả loại vật phẩm',
    example: 'Các loại vũ khí dùng trong trò chơi',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  description?: string;

  @ApiProperty({
    description: 'Ký hiệu loại vật phẩm',
    example: 'Vũ khí',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  symbol?: string;
}
