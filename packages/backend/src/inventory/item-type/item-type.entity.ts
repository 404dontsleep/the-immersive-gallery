import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class ItemType extends BaseEntity {
  @ApiProperty({
    type: String,
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  description: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  symbol: string;
}
