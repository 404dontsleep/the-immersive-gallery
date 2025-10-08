import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankResult } from './entities/bank-result.entity';
import { BankResultController } from './bank-result.controller';
import { BankResultService } from './bank-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankResult])],
  controllers: [BankResultController],
  providers: [BankResultService],
  exports: [BankResultService],
})
export class BankResultModule {}
