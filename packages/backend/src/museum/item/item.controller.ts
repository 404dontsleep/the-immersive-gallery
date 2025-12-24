import { Item } from './item.entity';
import { ItemService } from './item.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { RegisterPermission } from '@/permission/decorators';
import createBaseController from '@/base/base.controller';
import { ItemDto } from './item.dto';

@Controller('items')
@ApiTags('items')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RegisterPermission({
  name: 'ItemController',
  description: 'Item management',
})
export class ItemController extends createBaseController(Item, ItemDto) {
  constructor(readonly itemService: ItemService) {
    super(itemService);
  }
}
