import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@/user/user.entity';
import { ItemType } from './item-type/item-type.entity';

@Entity()
export class Inventory extends BaseEntity {
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, user => user.inventories)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ type: () => ItemType })
  @ManyToOne(() => ItemType, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'itemTypeId' })
  itemType: ItemType;

  @ApiProperty({ type: Number })
  @Column('integer')
  quantity: number;

  @ApiProperty({ type: Date })
  @Column({ type: 'date', nullable: true })
  expirationDate: Date;
}
