import { BaseEntity } from '@/base/base-entity';
import { User } from '@/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TransactionStatus } from '../enums/transaction.enum';
import { TransactionItem } from './transaction-item.entity';
import { Bank } from '@/bank/entities/bank.entity';

@Entity()
export class Transaction extends BaseEntity {
  @ApiProperty({ type: String })
  @Index()
  @Column({
    type: 'uuid',
    unique: true,
    default: () => 'uuid_generate_v4()',
  })
  uuid: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, user => user.transactions)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, user => user.transactions)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;

  @ApiProperty({ type: () => [TransactionItem] })
  @OneToMany(() => TransactionItem, item => item.transaction, {
    cascade: ['insert'],
  })
  items: TransactionItem[];

  @ApiProperty({
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
  })
  @Column({ type: 'enum', enum: TransactionStatus })
  status: TransactionStatus;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean', default: false })
  isAccepted: boolean;

  @ManyToOne(() => Bank, bank => bank.transactions)
  @JoinColumn({ name: 'bankId' })
  bank: Bank;
}
