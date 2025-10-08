import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { TransactionItemDto } from '@/transaction/dtos/transaction.dto';

export class BankDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsUrl()
  cronUrl: string;

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({ type: () => [TransactionItemDto] })
  @Type(() => TransactionItemDto)
  @ValidateNested({ each: true })
  items: TransactionItemDto[];
}
