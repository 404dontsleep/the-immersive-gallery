import { BaseEntity } from '@/base/base-entity';
import { ItemType } from '@/inventory/item-type/item-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Bank } from '@/bank/entities/bank.entity';

@Entity()
export class TransactionItem extends BaseEntity {
  @ApiProperty({ type: () => ItemType })
  @ManyToOne(() => ItemType)
  @JoinColumn({ name: 'itemTypeId' })
  itemType: ItemType;

  @ApiProperty({ type: Number })
  @Column({ type: 'integer' })
  quantity: number;

  @ApiProperty({ type: Date })
  @Column({ type: 'date', nullable: true })
  expirationDate?: Date;

  @ManyToOne(() => Bank, bank => bank.items)
  @JoinColumn({ name: 'bankId' })
  bank: Bank;

  @ManyToOne(() => Transaction, transaction => transaction.items)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;
}
