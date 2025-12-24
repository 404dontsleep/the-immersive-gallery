import { Injectable } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { Category } from './category.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CategoryService extends createBaseService(Category) {
  async delete(id: number): Promise<void> {
    return super.softDelete(id);
  }
  async create(data: DeepPartial<Category>): Promise<Category> {
    const { id } = data;
    if (id) {
      const category = await this.findOne({
        where: { id },
        withDeleted: true,
      });
      if (category) {
        if (category.deletedAt !== null) {
          await this.repository.restore(category.id);
          await this.clearAllCache();
          return this.findById(category.id);
        } else {
          return category;
        }
      }
    }
    return super.create(data);
  }
}
