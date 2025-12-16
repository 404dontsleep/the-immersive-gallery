import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;
}
