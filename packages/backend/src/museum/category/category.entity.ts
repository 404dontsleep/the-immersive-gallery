import { BaseEntity } from '@/base/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AssetsItem } from '../assets/assets-item.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => AssetsItem, {
    cascade: ['insert'],
    eager: true,
  })
  @ApiProperty({ type: () => AssetsItem })
  @JoinColumn({ name: 'iconAssetsId' })
  iconAssets: AssetsItem;
}
