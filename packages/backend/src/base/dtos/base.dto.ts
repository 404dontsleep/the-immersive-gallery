import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

export function createBaseDto<T extends any>(model: Type<T>) {
  class BaseDto {
    @ApiProperty({
      description: `Match any value in the list of ${model.name}`,
      type: [model],
      required: false,
    })
    @IsOptional()
    @IsArray({
      context: model,
      message(validationArguments) {
        return `Invalid ${validationArguments.property} value`;
      },
    })
    in?: T[];

    @ApiProperty({
      description: `Exclude any value in the list of ${model.name}`,
      type: [model],
      required: false,
    })
    @IsOptional()
    @IsArray({
      context: model,
    })
    notIn?: T[];

    @ApiProperty({
      description: `Match any value in the list of ${model.name}`,
      type: Boolean,
      required: false,
    })
    @IsOptional()
    @IsBoolean()
    isNull?: boolean;

    @ApiProperty({
      description: `Match any value in the list of ${model.name}`,
      type: Boolean,
      required: false,
    })
    @IsOptional()
    @IsBoolean()
    isNotNull?: boolean;
  }

  Object.defineProperty(BaseDto, 'name', { value: `${model.name}Dto` });
  return BaseDto;
}
