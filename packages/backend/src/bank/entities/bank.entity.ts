import { BaseEntity } from '@/base/base-entity';
import { Transaction } from '@/transaction/entities/transaction.entity';
import { createCryptoTransformer } from '@/utils/transformers/crypto.transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { TransactionItem } from '@/transaction/entities/transaction-item.entity';
import { BankResult } from '@/bank-result/entities/bank-result.entity';

const key = process.env.DB_ENCRYPT_SECRET || 'AS*D()ASD)ajs)DUJA*SD';

@Entity()
export class Bank extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Exclude({
    toPlainOnly: false,
    toClassOnly: true,
  })
  @Column({
    type: 'text',
    transformer: createCryptoTransformer(key),
    select: false,
  })
  cronUrl: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  lastCron: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ type: () => [Transaction] })
  @OneToMany(() => Transaction, transaction => transaction.bank, {
    cascade: ['insert', 'update'],
  })
  transactions: Transaction[];

  @ApiProperty({ type: () => [TransactionItem] })
  @OneToMany(() => TransactionItem, item => item.bank, {
    cascade: true,
  })
  items: TransactionItem[];

  @ApiProperty({ type: () => [BankResult] })
  @OneToMany(() => BankResult, result => result.bank, {
    cascade: ['insert'],
  })
  bankResults: BankResult[];
}
