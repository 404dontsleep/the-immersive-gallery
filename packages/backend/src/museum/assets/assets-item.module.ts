import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsItem } from './assets-item.entity';
import { AssetsItemController } from './assets-item.controller';
import { AssetsItemPublicController } from './assets-item-public.controller';
import { Module } from '@nestjs/common';
import { AssetsItemService } from './assets-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssetsItem])],
  controllers: [AssetsItemController, AssetsItemPublicController],
  providers: [AssetsItemService],
  exports: [AssetsItemService],
})
export class AssetsItemModule {}
