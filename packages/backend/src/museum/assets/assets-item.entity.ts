import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/base/base-entity';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export enum AssetsItemType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  MODEL = 'model',
  FOLDER = 'folder',
}

@Entity()
export class AssetsItem extends BaseEntity {
  @Column({
    nullable: true,
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ManyToOne(() => AssetsItem, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  @ApiProperty({ type: () => AssetsItem, required: false })
  parent: AssetsItem | null;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  parentId: number | null;

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

  @Column({
    nullable: true,
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}
