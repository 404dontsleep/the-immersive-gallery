import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/base/base-entity';

export enum AssetsItemType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  MODEL = 'model',
}

@Entity()
export class AssetsItem extends BaseEntity {
  @Column()
  @ApiProperty()
  url: string;

  @Column({
    type: 'enum',
    enum: AssetsItemType,
    enumName: 'AssetsItemType',
  })
  @ApiProperty({
    enum: AssetsItemType,
    enumName: 'AssetsItemType',
  })
  type: AssetsItemType;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;
}
