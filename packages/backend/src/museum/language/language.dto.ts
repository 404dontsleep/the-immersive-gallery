import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LanguageCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  code: string;
}

export class LanguageCountryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  country: string;
}

export class LanguageDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  value: string;
}
