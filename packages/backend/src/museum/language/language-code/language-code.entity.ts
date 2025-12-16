import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Language } from '../language.entity';
import { BaseEntity } from '@/base/base-entity';

@Entity()
export class LanguageCode extends BaseEntity {
  @Column({
    unique: true,
  })
  @ApiProperty()
  code: string;

  @OneToMany(() => Language, language => language.code)
  languages: Language[];

  @Column()
  @ApiProperty()
  description: string;
}
