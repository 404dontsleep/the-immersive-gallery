import { Injectable, NotFoundException } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { Item } from './item.entity';
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { AssetsItem } from '../assets/assets-item.entity';

const defaultOptions: FindOneOptions<Item> = {
  relations: ['assets', 'category'],
  select: {
    assets: {
      id: true,
      name: true,
      type: true,
      url: true,
      description: true,
    },
    category: {
      id: true,
      name: true,
      description: true,
      iconAssets: {
        id: true,
        url: true,
        name: true,
        type: true,
        description: true,
      },
    },
  },
};

@Injectable()
export class ItemService extends createBaseService(Item) {
  findAll(options?: FindManyOptions<Item>): Promise<Item[]> {
    return super.findAll({ ...defaultOptions, ...options });
  }
  findOne(options?: FindOneOptions<Item>): Promise<Item> {
    return super.findOne({ ...defaultOptions, ...options });
  }
  count(options?: FindManyOptions<Item>): Promise<number> {
    return super.count({ ...defaultOptions, ...options });
  }
  async update(id: number, data: DeepPartial<Item>): Promise<Item> {
    const { assets, ...rest } = data;
    const item = await this.findOne({ where: { id }, relations: ['assets'] });
    if (!item) throw new NotFoundException();
    if (assets) {
      item.assets = assets.map(asset => ({ id: asset.id }) as AssetsItem);
    } else {
      item.assets = [];
    }
    return this.repository.save({ ...item, ...rest }).finally(() => {
      this.clearAllCache();
    });
  }
}
