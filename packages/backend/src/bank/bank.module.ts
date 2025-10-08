import { Module } from '@nestjs/common';
import { Bank } from './entities/bank.entity';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankCron } from './crons/bank.cron';
import { HttpModule } from '@nestjs/axios';
import { BankResult } from '@/bank-result/entities/bank-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank, BankResult]),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 0,
    }),
  ],
  controllers: [BankController],
  providers: [BankService, BankCron],
  exports: [BankService],
})
export class BankModule {}
