import { Controller, UseGuards } from '@nestjs/common';
import { SysConfig } from './sys-config.entity';
import createBaseController from '@/base/base.controller';
import { SysConfigDto } from './dtos/sys-config.dto';
import { SysConfigService } from './sys-config.service';
import { DefaultParentName, RegisterPermission } from '@/permission/decorators';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';

@Controller('sys-config')
@RegisterPermission({
  name: 'SysConfigController',
  description: 'SysConfig Permission',
  parentNames: [DefaultParentName.Root],
})
@UseGuards(JwtAuthGuard, PermissionGuard)
export class SysConfigController extends createBaseController(
  SysConfig,
  SysConfigDto,
  {
    _delete: false,
  },
) {
  constructor(readonly sysConfigService: SysConfigService) {
    super(sysConfigService);
  }
}
