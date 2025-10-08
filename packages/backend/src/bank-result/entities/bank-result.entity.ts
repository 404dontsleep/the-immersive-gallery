import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BankResultType } from '../enums/bank-result.enum';
import { Bank } from '@/bank/entities/bank.entity';

@Entity()
export class BankResult extends BaseEntity {
  @ApiProperty()
  @Column({
    unique: true,
  })
  transactionID: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  transactionDate: Date;

  @ApiProperty({ enum: BankResultType, enumName: 'BankResultType' })
  @Column({
    type: 'enum',
    enum: BankResultType,
  })
  type: BankResultType;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isProcessed: boolean;

  @ApiProperty({ type: () => Bank })
  @ManyToOne(() => Bank, bank => bank.bankResults)
  @JoinColumn({ name: 'bankId' })
  bank: Bank;
}
