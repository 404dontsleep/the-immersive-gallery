import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AssetsItemDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  description: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId: number | null;
}

export class AssetsItemUnitDto extends PickType(AssetsItemDto, ['id']) {}

export class CreateFolderDto extends PickType(AssetsItemDto, [
  'name',
  'parentId',
]) {}
