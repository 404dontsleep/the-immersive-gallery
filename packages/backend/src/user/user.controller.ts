import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import createBaseController from '../base/base.controller';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import {
  DefaultParentName,
  RegisterPermission,
  RegisterPermissionMethod,
  RequirePermission,
} from '@/permission/decorators';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { UserPermissionDto } from './dtos/user-permission.dto';
import {
  UserInventoriesDto,
  UserInventoriesTrackingDto,
} from './dtos/inventories.dto';
import { AuthInfo } from '@/auth/decorators/auth-info.decorator';

@ApiTags('users')
@Controller('users')
@RegisterPermission({
  name: 'UserController',
  description: 'User management',
})
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController extends createBaseController(User, UserDto) {
  constructor(readonly userService: UserService) {
    super(userService);
  }

  @ApiResponse({ status: 200, type: User })
  @Get('findOneWithPermissions/:id')
  @RegisterPermissionMethod({
    name: 'ViewPermissions',
    description: 'View data',
  })
  @RequirePermission('ViewPermissions')
  @ApiParam({ name: 'id', type: Number })
  async findOneWithPermissions(@Param('id') id: number): Promise<User> {
    return this.userService.findOneWithPermissions(id);
  }

  @ApiResponse({ status: 200 })
  @Post('updateWithPermissions/:id')
  @RegisterPermissionMethod({
    name: 'ChangePermissions',
    description: 'Update User Permissions',
  })
  @RequirePermission('ChangePermissions')
  async updateWithPermissions(
    @Param('id') id: number,
    @Body() data: UserPermissionDto,
  ): Promise<void> {
    await this.userService.updateWithPermissions(id, data.permissions);
  }

  @ApiResponse({ status: 200, type: User })
  @Get('findOneWithInventories/:id')
  @RegisterPermissionMethod({
    name: 'ViewInventories',
    description: 'View data',
  })
  @RequirePermission('ViewInventories')
  @ApiParam({ name: 'id', type: Number })
  async findOneWithInventories(@Param('id') id: number): Promise<User> {
    return this.userService.findOneWithInventories(id);
  }

  @ApiResponse({ status: 200 })
  @Post('updateWithInventories/:id')
  @RegisterPermissionMethod({
    name: 'ChangeInventories',
    description: 'Update User Inventories',
  })
  @RequirePermission('ChangeInventories')
  @ApiBody({ type: UserInventoriesDto })
  async updateWithInventories(
    @Param('id') id: number,
    @Body() data: UserInventoriesDto,
  ): Promise<void> {
    await this.userService.updateWithInventories(id, data);
  }

  @ApiResponse({ status: 200, type: User })
  @Get('getMyProfile')
  @RegisterPermissionMethod({
    name: 'ViewMyProfile',
    description: 'View data',
    parentNames: [DefaultParentName.User],
  })
  @RequirePermission('ViewMyProfile')
  async getMyProfile(
    @AuthInfo() user: { email: string; info: User; permissions: string[] },
  ): Promise<User> {
    return user.info;
  }

  @ApiResponse({ status: 200 })
  @Post('updateWithInventoriesTracking/:id')
  @RequirePermission('ChangeInventories')
  @ApiBody({ type: [UserInventoriesTrackingDto] })
  async updateWithInventoriesTracking(
    @Param('id') id: number,
    @Body() data: UserInventoriesTrackingDto[],
  ): Promise<void> {
    await this.userService.updateWithInventoriesTracking(id, data);
  }
}
