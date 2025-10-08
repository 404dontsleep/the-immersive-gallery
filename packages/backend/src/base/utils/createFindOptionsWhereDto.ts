import { Type } from '@nestjs/common';
import { BaseEntity } from '../base-entity';
import { NumberWhereDto } from '../dtos/number.dto';
import { StringWhereDto } from '../dtos/string.dto';
import { DateWhereDto } from '../dtos/date.dto';
import { BooleanWhereDto } from '../dtos/boolean.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type as ClassType } from 'class-transformer';

export function createFindOptionsWhereDto<T extends BaseEntity>(
  model: Type<T>,
) {
  const modelProps =
    Reflect.getMetadata('swagger/apiModelPropertiesArray', model.prototype) ||
    [];

  class FindOptionsWhereDto {}

  modelProps.forEach((name: string) => {
    const property = name.split(':')[1];
    const propertyType = Reflect.getMetadata(
      'design:type',
      model.prototype,
      property,
    );

    let dtoType: any;

    switch (propertyType) {
      case Number:
        dtoType = NumberWhereDto;
        break;
      case String:
        dtoType = StringWhereDto;
        break;
      case Date:
        dtoType = DateWhereDto;
        break;
      case Boolean:
        dtoType = BooleanWhereDto;
        break;
      default:
        return;
    }

    ApiExtraModels(dtoType);
    ApiProperty({
      type: dtoType,
      required: false,
    })(FindOptionsWhereDto.prototype, property);

    ClassType(() => dtoType)(FindOptionsWhereDto.prototype, property);
    ValidateNested()(FindOptionsWhereDto.prototype, property);
  });

  return FindOptionsWhereDto;
}
