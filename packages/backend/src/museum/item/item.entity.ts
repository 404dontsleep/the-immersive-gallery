import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { AssetsItem } from '../assets/assets-item.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Item extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => Category, {})
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty({ type: () => Category })
  category: Category;

  @ManyToMany(() => AssetsItem, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'item_has_assets',
    joinColumn: {
      name: 'itemId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'assetsItemId',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({ type: () => [AssetsItem] })
  assets: AssetsItem[];
}
