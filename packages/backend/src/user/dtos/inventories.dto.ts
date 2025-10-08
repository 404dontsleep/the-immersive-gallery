import createBaseTrackingDto from '@/base/dtos/base-tracking.dto';
import { ItemTypeDto } from '@/inventory/item-type/dtos/item-type.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export enum InventoriesUnitAction {
  ADD = 'add',
  REMOVE = 'remove',
  SET = 'set',
}

export class InventoriesUnitDto {
  @ApiProperty({
    enum: InventoriesUnitAction,
    enumName: 'InventoriesUnitAction',
  })
  @IsEnum(InventoriesUnitAction)
  action: InventoriesUnitAction;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  itemId: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  expirationDate: Date;
}

export class UserInventoriesDto {
  @ApiProperty({
    required: false,
    type: [InventoriesUnitDto],
  })
  @IsNotEmpty()
  @IsOptional()
  @IsArray({
    context: InventoriesUnitDto,
  })
  @Type(() => InventoriesUnitDto)
  inventories?: InventoriesUnitDto[];
}

export class UserInventoriesAddDto {
  @ApiProperty({
    required: true,
    enum: [InventoriesUnitAction.ADD],
    default: InventoriesUnitAction.ADD,
  })
  @IsEnum(InventoriesUnitAction)
  action: InventoriesUnitAction = InventoriesUnitAction.ADD;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  itemId: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  expirationDate: Date;
}

export class UserInventoriesSetDto {
  @ApiProperty({
    required: true,
    enum: [InventoriesUnitAction.SET],
    default: InventoriesUnitAction.SET,
  })
  @IsEnum(InventoriesUnitAction)
  action: InventoriesUnitAction = InventoriesUnitAction.SET;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  inventoryId: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  expirationDate: Date;
}

export class UserInventoriesRemoveDto {
  @ApiProperty({
    required: true,
    enum: [InventoriesUnitAction.REMOVE],
    default: InventoriesUnitAction.REMOVE,
  })
  @IsEnum(InventoriesUnitAction)
  action: InventoriesUnitAction = InventoriesUnitAction.REMOVE;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  inventoryId: number;
}

export class UserInventoriesV2Dto {
  @ApiProperty({
    required: true,
    type: [UserInventoriesAddDto],
  })
  @IsArray()
  @Type(() => UserInventoriesAddDto)
  add: UserInventoriesAddDto[];

  @ApiProperty({
    required: true,
    type: [UserInventoriesSetDto],
  })
  @IsArray()
  @Type(() => UserInventoriesSetDto)
  set: UserInventoriesSetDto[];

  @ApiProperty({
    required: true,
    type: [UserInventoriesRemoveDto],
  })
  @IsArray()
  @Type(() => UserInventoriesRemoveDto)
  remove: UserInventoriesRemoveDto[];
}

export class UserInvertoryDto {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  expirationDate: Date;

  @ApiProperty({
    required: false,
    type: ItemTypeDto,
  })
  @Type(() => ItemTypeDto)
  @ValidateNested()
  itemType: ItemTypeDto;
}

export class UserInventoriesTrackingDto extends createBaseTrackingDto(
  UserInvertoryDto,
) {}
