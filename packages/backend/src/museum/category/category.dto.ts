import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AssetsItemUnitDto } from '../assets/assets-item.dto';

export class CategoryDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: () => AssetsItemUnitDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested({ context: AssetsItemUnitDto })
  @Type(() => AssetsItemUnitDto)
  iconAssets?: AssetsItemUnitDto;
}

export class CategoryUnitDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
