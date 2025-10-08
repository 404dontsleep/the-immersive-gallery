import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermissionDtoChildren {
  @ApiProperty({
    description: 'The id of the permission',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class PermissionDto {
  @ApiProperty({
    description: 'The id of the permission',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @ApiProperty({
    description: 'The name of the permission',
    example: 'view',
    type: String,
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the permission',
    example: 'View the permission',
    type: String,
  })
  @IsString()
  @Type(() => String)
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The children of the permission',
    example: [{ id: 1 }, { id: 2 }],
    type: [PermissionDtoChildren],
  })
  @IsArray()
  @Type(() => PermissionDtoChildren)
  @IsOptional()
  children: PermissionDtoChildren[];
}
