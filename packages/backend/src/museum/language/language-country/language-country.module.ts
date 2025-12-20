import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageCountry } from './language-country.entity';
import { LanguageCountryController } from './language-country.controller';
import { Module } from '@nestjs/common';
import { LanguageCountryService } from './language-country.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageCountry])],
  controllers: [LanguageCountryController],
  providers: [LanguageCountryService],
  exports: [LanguageCountryService],
})
export class LanguageCountryModule {}
