import { Injectable } from '@nestjs/common';
import { LanguageCodeService } from './language-code/language-code.service';
import { LanguageCountryService } from './language-country/language-country.service';
import { LanguageService } from './language.service';

@Injectable()
export class LanguagePublicService {
  constructor(
    private readonly languageService: LanguageService,
    private readonly languageCodeService: LanguageCodeService,
    private readonly languageCountryService: LanguageCountryService,
  ) {}

  async getCountries() {
    return this.languageCountryService.findAll({});
  }

  async getCodes() {
    return this.languageCodeService.findAll({});
  }

  async getLanguages() {
    return this.languageService.findAll({});
  }

  async getLanguageMapped() {
    const result = await this.languageService.findAll({});
    const mapped = {};
    for (const item of result) {
      if (!mapped[item.country]) {
        mapped[item.country] = {};
      }
      mapped[item.country][item.code] = item.value;
    }
    return mapped;
  }
}
