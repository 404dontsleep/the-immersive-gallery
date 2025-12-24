import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { RegisterPermission } from '@/permission/decorators';
import createBaseController from '@/base/base.controller';
import { CategoryDto } from './category.dto';

@Controller('categories')
@ApiTags('categories')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RegisterPermission({
  name: 'CategoryController',
  description: 'Category management',
})
export class CategoryController extends createBaseController(
  Category,
  CategoryDto,
) {
  constructor(readonly categoryService: CategoryService) {
    super(categoryService);
  }
}

