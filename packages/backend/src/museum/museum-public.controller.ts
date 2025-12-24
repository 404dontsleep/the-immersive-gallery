import { AssetsItem } from './assets/assets-item.entity';
import { AssetsItemService } from './assets/assets-item.service';
import { Category } from './category/category.entity';
import { CategoryService } from './category/category.service';
import { Item } from './item/item.entity';
import { ItemService } from './item/item.service';
import { Controller, Get } from '@nestjs/common';

@Controller('museum-public')
export class MuseumPublicController {
  constructor(
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService,
    private readonly assetsItemService: AssetsItemService,
  ) {}

  @Get('items')
  async getItems(): Promise<Item[]> {
    return this.itemService.findAll({});
  }

  @Get('categories')
  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll({});
  }

  @Get('assets-items')
  async getAssetsItems(): Promise<AssetsItem[]> {
    return this.assetsItemService.findAll({});
  }
}
