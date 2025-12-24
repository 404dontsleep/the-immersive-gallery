import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AssetsItemUnitDto } from '../assets/assets-item.dto';
import { CategoryUnitDto } from '../category/category.dto';

export class ItemDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: () => [AssetsItemUnitDto],
    required: false,
  })
  @IsOptional()
  @IsArray({ context: AssetsItemUnitDto })
  @ValidateNested({ context: AssetsItemUnitDto })
  @Type(() => AssetsItemUnitDto)
  assets?: AssetsItemUnitDto[];

  @ApiProperty({
    type: () => CategoryUnitDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested({ context: CategoryUnitDto })
  @Type(() => CategoryUnitDto)
  category: CategoryUnitDto;
}
