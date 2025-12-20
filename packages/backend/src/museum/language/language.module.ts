import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { LanguageCodeModule } from './language-code/language-code.module';
import { LanguageCountryModule } from './language-country/language-country.module';
import { LanguagePublicController } from './language-public.controller';
import { LanguagePublicService } from './language-public.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Language]),
    LanguageCodeModule,
    LanguageCountryModule,
  ],
  controllers: [LanguageController, LanguagePublicController],
  providers: [LanguageService, LanguagePublicService],
  exports: [LanguageService],
})
export class LanguageModule {}
