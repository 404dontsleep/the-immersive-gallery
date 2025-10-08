import createBaseController from '@/base/base.controller';
import { Bank } from './entities/bank.entity';
import { BankDto } from './dtos/bank.dto';
import { BankService } from './bank.service';
import { Controller, UseGuards } from '@nestjs/common';
import { RegisterPermission } from '@/permission/decorators';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('banks')
@RegisterPermission({
  name: 'BankController',
  description: 'Bank Permission',
})
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('banks')
export class BankController extends createBaseController(Bank, BankDto) {
  constructor(readonly bankService: BankService) {
    super(bankService);
  }
}
