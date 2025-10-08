import { Controller, Get } from '@nestjs/common';
import { RegistedPermission } from './decorators';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

class RegistedPermissionDto {
  @ApiProperty({
    enum: RegistedPermission,
    enumName: 'EnumPermission',
  })
  permission: keyof typeof RegistedPermission;
}

@Controller('export-permission')
export class ExportPermissionController {
  @Get('allPermissions')
  @ApiResponse({ status: 200, type: [RegistedPermissionDto] })
  async allPermissions(): Promise<string[]> {
    return Object.keys(RegistedPermission);
  }
}
