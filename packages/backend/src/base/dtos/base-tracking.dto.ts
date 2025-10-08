import { Type as NestType } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';

export enum BaseTrackingAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface IBaseTrackingDto<T extends object> {
  action: BaseTrackingAction;
  data: T;
}

export default function createBaseTrackingDto<T extends object>(
  dto: NestType<T>,
): NestType<IBaseTrackingDto<T>> {
  class BaseModelDto extends dto {}
  Object.defineProperties(BaseModelDto, {
    name: { value: `${dto.name}` },
  });

  class BaseTrackingDto {
    @ApiProperty({ enum: BaseTrackingAction, enumName: 'BaseTrackingAction' })
    @IsEnum(BaseTrackingAction)
    action: BaseTrackingAction;

    @ApiProperty({ type: BaseModelDto })
    @ValidateNested()
    @Type(() => BaseModelDto)
    data: BaseModelDto;
  }

  Object.defineProperty(BaseTrackingDto, 'name', {
    value: `${dto.name}TrackingDto`,
  });

  return BaseTrackingDto;
}
