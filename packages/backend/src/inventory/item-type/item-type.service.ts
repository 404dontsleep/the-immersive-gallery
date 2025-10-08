import createBaseService from '@/base/base.service';
import { Injectable } from '@nestjs/common';
import { ItemType } from './item-type.entity';
import { DeepPartial } from 'typeorm';
import { User } from '@/user/user.entity';

@Injectable()
export class ItemTypeService extends createBaseService(ItemType) {
  async delete(id: number): Promise<void> {
    return super.softDelete(id);
  }
  async create(data: DeepPartial<ItemType>): Promise<ItemType> {
    const { id } = data;
    if (id) {
      const itemType = await this.findOne({
        where: { id },
        withDeleted: true,
      });
      if (itemType) {
        if (itemType.deletedAt !== null) {
          await this.repository.restore(itemType.id);
          await this.clearAllCache();
          return this.findById(itemType.id);
        } else {
          return itemType;
        }
      }
    }
    return super.create(data);
  }
  getAllCacheKey(): string[] {
    return [...super.getAllCacheKey(), `${User.name}:inventories`];
  }
}
