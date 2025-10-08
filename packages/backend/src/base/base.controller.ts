import 'reflect-metadata';

import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Type,
} from '@nestjs/common';
import { IBaseService } from './base.service';

import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseEntity } from './base-entity';
import { payloadToOrm } from './utils/payloadToOrm';
import { createFindOptionsWhereDto } from './utils/createFindOptionsWhereDto';
import { createFindManyOptionsDto } from './utils/createFindManyOptionsDto';
import {
  DefaultPermissionName,
  RegisterPermissionMethod,
  RequirePermission,
} from '@/permission/decorators';
import { DeepPartial } from 'typeorm';
import Optional from '@/utils/optional.decorator';

export interface IBaseController<T extends BaseEntity> {
  findAll(options?: any): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(data: DeepPartial<T>): Promise<void>;
  update(id: number, data: DeepPartial<T>): Promise<void>;
  delete(id: number): Promise<void>;
  count(options?: any): Promise<number>;
}
type BaseControllerOptions = {
  findAll?: boolean;
  findById?: boolean;
  create?: boolean;
  update?: boolean;
  _delete?: boolean;
  count?: boolean;
};
export default function createBaseController<T extends BaseEntity>(
  model: Type<T>,
  dto: Type<any>,
  options?: BaseControllerOptions,
): Type<IBaseController<T>> {
  const {
    findAll = true,
    findById = true,
    create = true,
    update = true,
    _delete = true,
    count = true,
  } = options || {};
  class FindOptionsWhereDto extends createFindOptionsWhereDto(model) {}
  Object.defineProperty(FindOptionsWhereDto, 'name', {
    value: `${dto.name}FindOptionsWhereDto`,
  });

  class FindManyOptionsDto extends createFindManyOptionsDto(model) {}
  Object.defineProperty(FindManyOptionsDto, 'name', {
    value: `${dto.name}FindManyOptions`,
  });

  class InstanceDto extends dto {}

  @ApiExtraModels(FindManyOptionsDto, FindOptionsWhereDto)
  class BaseController implements IBaseController<T> {
    constructor(private readonly baseService: IBaseService<T>) {}

    @Optional(ApiResponse, count, { status: 200, type: Number })
    @Optional(ApiQuery, count, {
      name: 'where',
      explode: true,
      required: false,
      schema: {
        oneOf: [
          { $ref: getSchemaPath(FindOptionsWhereDto) },
          {
            type: 'array',
            items: { $ref: getSchemaPath(FindOptionsWhereDto) },
          },
        ],
      },
    })
    @Optional(RegisterPermissionMethod, count, {
      name: DefaultPermissionName.View,
      description: 'View data',
    })
    @Optional(Get, count, 'count')
    @Optional(RequirePermission, count, DefaultPermissionName.View)
    async count(@Query() options?: FindManyOptionsDto): Promise<number> {
      return this.baseService.count(payloadToOrm(options));
    }

    @Optional(ApiResponse, findAll, { status: 200, type: [model] })
    @Optional(Get, findAll)
    @Optional(ApiQuery, findAll, {
      name: 'where',
      explode: true,
      required: false,
      schema: {
        oneOf: [
          { $ref: getSchemaPath(FindOptionsWhereDto) },
          {
            type: 'array',
            items: { $ref: getSchemaPath(FindOptionsWhereDto) },
          },
        ],
      },
    })
    @Optional(RegisterPermissionMethod, findAll, {
      name: DefaultPermissionName.View,
      description: 'View data',
    })
    @Optional(RequirePermission, findAll, DefaultPermissionName.View)
    async findAll(@Query() options?: FindManyOptionsDto): Promise<T[]> {
      return this.baseService.findAll(payloadToOrm(options));
    }

    @Optional(ApiResponse, findById, { status: 200, type: model })
    @Optional(ApiParam, findById, { name: 'id', type: Number })
    @Optional(Get, findById, ':id')
    @Optional(RegisterPermissionMethod, findById, {
      name: DefaultPermissionName.View,
      description: 'View data',
    })
    @Optional(RequirePermission, findById, DefaultPermissionName.View)
    async findById(@Param('id') id: number): Promise<T> {
      return this.baseService.findOne({
        where: {
          id: id as any,
        },
      });
    }

    @Optional(ApiResponse, create, {
      status: 201,
      description: 'Created successfully',
    })
    @Optional(ApiBody, create, { type: dto })
    @Optional(Post, create)
    @Optional(RegisterPermissionMethod, create, {
      name: DefaultPermissionName.Create,
      description: 'Create data',
    })
    @Optional(RequirePermission, create, DefaultPermissionName.Create)
    async create(@Body() data: InstanceDto): Promise<void> {
      await this.baseService.create(data);
    }

    @Optional(ApiResponse, update, {
      status: 200,
      description: 'Updated successfully',
    })
    @Optional(ApiParam, update, { name: 'id', type: Number })
    @Optional(ApiBody, update, { type: dto })
    @Optional(Put, update, ':id')
    @Optional(RegisterPermissionMethod, update, {
      name: DefaultPermissionName.Update,
      description: 'Update data',
    })
    @Optional(RequirePermission, update, DefaultPermissionName.Update)
    async update(
      @Param('id') id: number,
      @Body() data: InstanceDto,
    ): Promise<void> {
      await this.baseService.checkLocked(id);
      await this.baseService.update(id, { ...data } as DeepPartial<T>);
    }

    @Optional(ApiResponse, _delete, {
      status: 204,
      description: 'Deleted successfully',
    })
    @Optional(ApiParam, _delete, { name: 'id', type: Number })
    @Optional(Delete, _delete, ':id')
    @Optional(RegisterPermissionMethod, _delete, {
      name: DefaultPermissionName.Delete,
      description: 'Delete data',
    })
    @Optional(RequirePermission, _delete, DefaultPermissionName.Delete)
    async delete(@Param('id') id: number): Promise<void> {
      await this.baseService.checkLocked(id);
      await this.baseService.delete(id);
    }
  }

  return BaseController;
}
