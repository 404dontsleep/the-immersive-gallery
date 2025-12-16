import { BaseEntity } from '@/base/base-entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { LanguageCode } from './language-code/language-code.entity';
import { LanguageCountry } from './language-country/language-country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['code', 'country'])
export class Language extends BaseEntity {
  @ManyToOne(() => LanguageCode, languageCode => languageCode.languages)
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  code: string;

  @ManyToOne(
    () => LanguageCountry,
    languageCountry => languageCountry.languages,
  )
  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  country: string;

  @Column()
  @ApiProperty()
  value: string;
}
