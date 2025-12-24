import { LanguageModule } from './language/language.module';
import { Module } from '@nestjs/common';
import { AssetsItemModule } from './assets/assets-item.module';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { MuseumPublicController } from './museum-public.controller';

@Module({
  imports: [LanguageModule, AssetsItemModule, ItemModule, CategoryModule],
  controllers: [MuseumPublicController],
})
export class MuseumModule {}
