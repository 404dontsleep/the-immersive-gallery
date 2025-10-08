import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SysCronService } from './sys-cron.service';
import createBaseController from '@/base/base.controller';
import { SysCron } from './sys-cron.entity';
import { SysCronDto } from './sys-cron.dto';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  DefaultParentName,
  DefaultPermissionName,
  RegisterPermission,
  RegisterPermissionMethod,
  RequirePermission,
} from '@/permission/decorators';
import { SysCronRegister } from './sys-cron.register';
import { ApiBody } from '@nestjs/swagger';

@Controller('sys-cron')
@RegisterPermission({
  name: 'SysCronController',
  description: 'SysCron Permission',
  parentNames: [DefaultParentName.Root],
})
@UseGuards(JwtAuthGuard, PermissionGuard)
export class SysCronController extends createBaseController(
  SysCron,
  SysCronDto,
  {
    _delete: false,
    create: false,
    update: false,
  },
) {
  constructor(
    sysCronService: SysCronService,
    private readonly sysCronRegister: SysCronRegister,
  ) {
    super(sysCronService);
  }

  @Post('update')
  @RegisterPermissionMethod({
    name: DefaultPermissionName.Update,
    description: 'Update data',
  })
  @RequirePermission(DefaultPermissionName.Update)
  @ApiBody({ type: SysCronDto })
  async updateCron(@Body() data: SysCronDto) {
    return this.sysCronRegister.updateJob(data);
  }
}
