import 'reflect-metadata';

import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@/permission/permission.entity';
import { Inventory } from '@/inventory/inventory.entity';
import { Transaction } from '@/transaction/entities/transaction.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @ApiProperty()
  email: string;

  @ApiProperty({
    type: [Permission],
  })
  @ManyToMany(() => Permission, permission => permission.users)
  @JoinTable({
    name: 'user_has_permission',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @ApiProperty({ type: [Inventory] })
  @OneToMany(() => Inventory, inventory => inventory.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  inventories: Inventory[];

  @ApiProperty({ type: [Transaction] })
  @OneToMany(() => Transaction, transaction => transaction.fromUser, {
    cascade: ['insert', 'update'],
  })
  transactions: Transaction[];
}
