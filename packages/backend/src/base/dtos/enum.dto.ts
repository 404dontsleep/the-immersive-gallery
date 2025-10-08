import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsArray } from 'class-validator';

export function createEnumWhereDto<T extends object>(
  enumType: T,
  name = 'EnumWhereDto',
) {
  class EnumWhereDto {
    @ApiProperty({
      required: false,
      enum: enumType,
      description: 'Exact match for an enum value',
    })
    @IsOptional()
    @IsEnum(enumType)
    equals?: T[keyof T];

    @ApiProperty({
      required: false,
      enum: enumType,
      isArray: true,
      description: 'Match any of the provided enum values',
    })
    @IsOptional()
    @IsArray()
    @IsEnum(enumType, { each: true })
    in?: T[keyof T][];
  }

  Object.defineProperty(EnumWhereDto, 'name', { value: name });
  return EnumWhereDto;
}
