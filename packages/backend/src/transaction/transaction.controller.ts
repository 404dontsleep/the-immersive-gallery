import { Controller, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import createBaseController from '@/base/base.controller';
import { TransactionDto } from './dtos/transaction.dto';
import { DefaultParentName, RegisterPermission } from '@/permission/decorators';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('transactions')
@RegisterPermission({
  name: 'TransactionController',
  description: 'Transaction Permission',
  parentNames: [DefaultParentName.Root],
})
@UseGuards(JwtAuthGuard, PermissionGuard)
export class TransactionController extends createBaseController(
  Transaction,
  TransactionDto,
  {
    _delete: false,
    update: false,
  },
) {
  constructor(readonly transactionService: TransactionService) {
    super(transactionService);
  }
}
