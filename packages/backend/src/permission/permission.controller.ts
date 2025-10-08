import { Body, Controller, Get, Global, Post, UseGuards } from '@nestjs/common';
import {
  DefaultPermissionName,
  RegisterPermission,
  RegisterPermissionMethod,
  RequirePermission,
} from './decorators';
import { PermissionService } from './permission.service';
import createBaseController from '@/base/base.controller';
import { Permission } from './permission.entity';
import { PermissionDto } from './dtos/permission.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionRelationsDto } from './dtos/permission-relations.dto';
import { PermissionGuard } from './guards/permission.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@Global()
@RegisterPermission({
  name: 'PermissionController',
  description: 'Permission management',
})
@Controller('permissions')
@ApiTags('permissions')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PermissionController extends createBaseController(
  Permission,
  PermissionDto,
) {
  constructor(readonly permissionService: PermissionService) {
    super(permissionService);
  }

  @ApiResponse({ status: 200, type: [PermissionRelationsDto] })
  @Get('findAllWithRelations')
  @RegisterPermissionMethod({
    name: DefaultPermissionName.View,
    description: 'View data',
  })
  @RequirePermission(DefaultPermissionName.View)
  async findAllWithRelations(): Promise<Permission[]> {
    return this.permissionService.findAllWithRelations();
  }

  @ApiResponse({ status: 200 })
  @Post('updateRelations')
  @RegisterPermissionMethod({
    name: DefaultPermissionName.Update,
    description: 'Update data',
  })
  @RequirePermission(DefaultPermissionName.Update)
  async updateRelations(@Body() data: PermissionRelationsDto): Promise<void> {
    await this.permissionService.updateRelations(data.id, data);
  }
}
