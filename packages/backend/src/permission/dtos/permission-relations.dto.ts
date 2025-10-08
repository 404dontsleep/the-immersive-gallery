import { IsArray, IsEnum, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum PermissionRelationsDtoUnitType {
  Add = 'add',
  Remove = 'remove',
}

export class PermissionRelationsDtoUnit {
  @ApiProperty({
    description: 'The type of the permission',
    example: PermissionRelationsDtoUnitType.Add,
    enum: PermissionRelationsDtoUnitType,
    enumName: 'PermissionRelationsDtoUnitType',
  })
  @IsEnum(PermissionRelationsDtoUnitType)
  type: PermissionRelationsDtoUnitType;

  @ApiProperty({
    description: 'The id of the parent permission',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class PermissionRelationsDto {
  @ApiProperty({
    description: 'The id of the permission',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: 'The parents of the permission',
    example: [
      { id: 1, type: PermissionRelationsDtoUnitType.Add },
      { id: 2, type: PermissionRelationsDtoUnitType.Remove },
    ],
    type: [PermissionRelationsDtoUnit],
  })
  @IsArray({
    context: PermissionRelationsDto,
  })
  parents: PermissionRelationsDtoUnit[];

  @ApiProperty({
    description: 'The children of the permission',
    example: [
      { id: 1, type: PermissionRelationsDtoUnitType.Add },
      { id: 2, type: PermissionRelationsDtoUnitType.Remove },
    ],
    type: [PermissionRelationsDtoUnit],
  })
  @IsArray({
    context: PermissionRelationsDto,
  })
  children: PermissionRelationsDtoUnit[];
}
