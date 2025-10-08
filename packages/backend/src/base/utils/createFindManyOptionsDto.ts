import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { BaseEntity } from '../base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { createFindOptionsWhereDto } from './createFindOptionsWhereDto';
import { Type } from '@nestjs/common';
import { Transform, Type as ClassType } from 'class-transformer';

export interface IFindManyOptions {
  skip?: number;
  take?: number;
  where?: Record<string, any>[] | Record<string, any>;
  withDeleted?: boolean;
}

export function createFindManyOptionsDto<T extends BaseEntity>(model: Type<T>) {
  class FindOptionsWhereDto extends createFindOptionsWhereDto(model) {}
  Object.defineProperty(FindOptionsWhereDto, 'name', {
    value: `${model.name}FindOptionsWhereDto`,
  });

  class FindManyClz implements IFindManyOptions {
    @ApiProperty({ type: Number, required: false })
    @ClassType(() => Number)
    @IsNumber()
    @IsOptional()
    skip?: number;

    @ApiProperty({ type: Number, required: false })
    @ClassType(() => Number)
    @IsNumber()
    @IsOptional()
    take?: number;

    @ApiProperty({ type: Boolean, required: false })
    @ClassType(() => Boolean)
    @IsBoolean()
    @IsOptional()
    withDeleted?: boolean;

    @ValidateNested({ each: true })
    @ClassType(() => FindOptionsWhereDto)
    @Transform(({ value }) => {
      if (!value) return undefined;
      if (Array.isArray(value)) return value;
      return value;
    })
    where?: FindOptionsWhereDto[] | FindOptionsWhereDto;
  }

  return FindManyClz;
}
