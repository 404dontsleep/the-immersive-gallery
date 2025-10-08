import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { BankResult } from './entities/bank-result.entity';
import { BankResultDto } from './dtos/bank-result.dto';
import createBaseController from '@/base/base.controller';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  DefaultParentName,
  RegisterPermission,
  RegisterPermissionMethod,
  RequirePermission,
} from '@/permission/decorators';
import { BankResultService } from './bank-result.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('bank-results')
@RegisterPermission({
  name: 'BankResultController',
  description: 'BankResult Permission',
  parentNames: [DefaultParentName.Root],
})
@UseGuards(JwtAuthGuard, PermissionGuard)
export class BankResultController extends createBaseController(
  BankResult,
  BankResultDto,
  {
    _delete: false,
    create: false,
    update: false,
  },
) {
  constructor(readonly bankResultService: BankResultService) {
    super(bankResultService);
  }

  @Put('toggleProcessed/:id')
  @RegisterPermissionMethod({
    name: 'ToggleProcessed',
    description: 'Toggle processed',
  })
  @RequirePermission('ToggleProcessed')
  @ApiParam({ name: 'id', type: Number })
  async toggleProcessed(@Param('id') id: number): Promise<void> {
    await this.bankResultService.toggleProcessed(id);
  }
}
