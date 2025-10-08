import { Controller, UseGuards } from '@nestjs/common';
import createBaseController from '@/base/base.controller';
import { ItemType } from './item-type.entity';
import { ItemTypeDto } from './dtos/item-type.dto';
import { ItemTypeService } from './item-type.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterPermission } from '@/permission/decorators';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';

@RegisterPermission({
  name: 'ItemTypeController',
  description: 'Item type management',
})
@Controller('item-type')
@ApiTags('item-type')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ItemTypeController extends createBaseController(
  ItemType,
  ItemTypeDto,
) {
  constructor(readonly itemTypeService: ItemTypeService) {
    super(itemTypeService);
  }
}
