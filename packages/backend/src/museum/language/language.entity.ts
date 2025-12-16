import { BaseEntity } from '@/base/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { LanguageCode } from './language-code/language-code.entity';
import { LanguageCountry } from './language-country/language-country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['code', 'country'])
export class Language extends BaseEntity {
  @ManyToOne(() => LanguageCode, languageCode => languageCode.languages)
  @JoinColumn({ name: 'code', referencedColumnName: 'code' })
  code: LanguageCode;

  @ManyToOne(
    () => LanguageCountry,
    languageCountry => languageCountry.languages,
  )
  @JoinColumn({ name: 'country', referencedColumnName: 'country' })
  country: LanguageCountry;

  @Column()
  @ApiProperty()
  value: string;
}
