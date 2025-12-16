import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Language } from '../language.entity';
import { BaseEntity } from '@/base/base-entity';

@Entity()
export class LanguageCountry extends BaseEntity {
  @Column({
    unique: true,
  })
  @Index({ unique: true })
  @ApiProperty()
  country: string;

  @OneToMany(() => Language, language => language.country)
  languages: Language[];

  @Column()
  @ApiProperty()
  description: string;
}
