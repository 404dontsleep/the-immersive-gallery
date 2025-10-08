import { PermissionDtoChildren } from '@/permission/dtos/permission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class UserPermissionDto {
  @ApiProperty({
    required: false,
    type: [PermissionDtoChildren],
  })
  @IsArray({
    context: PermissionDtoChildren,
  })
  @IsOptional()
  @Type(() => PermissionDtoChildren)
  permissions?: PermissionDtoChildren[];
}
