import { BaseEntity } from '@/base/base-entity';
import { Column, Entity, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['code', 'country'])
export class Language extends BaseEntity {
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  code: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  country: string;

  @Column()
  @ApiProperty()
  value: string;
}
