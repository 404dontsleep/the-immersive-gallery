import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { TransactionStatus } from '../enums/transaction.enum';

export class TransactionItemTypeDto {
  @ApiProperty({ type: Number })
  @IsDefined({
    message: 'Item type is required',
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class TransactionItemDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ type: TransactionItemTypeDto })
  @Type(() => TransactionItemTypeDto)
  @ValidateNested()
  itemType: TransactionItemTypeDto;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ type: Date, required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expirationDate?: Date;
}

class TransactionUserDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class TransactionDto {
  @ApiProperty({ type: TransactionUserDto })
  @Type(() => TransactionUserDto)
  @ValidateNested()
  fromUser: TransactionUserDto;

  @ApiProperty({ type: TransactionUserDto })
  @Type(() => TransactionUserDto)
  @ValidateNested()
  toUser: TransactionUserDto;

  @ApiProperty({ type: [TransactionItemDto] })
  @IsArray({
    context: TransactionItemDto,
  })
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  items: TransactionItemDto[];

  @ApiProperty({
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
    required: false,
  })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status: TransactionStatus;
}
