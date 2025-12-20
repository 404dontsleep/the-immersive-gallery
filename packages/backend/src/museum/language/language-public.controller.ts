import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LanguagePublicService } from './language-public.service';

@Controller('language-public')
@ApiTags('language-public')
export class LanguagePublicController {
  constructor(readonly languagePublicService: LanguagePublicService) {}

  @Get('countries')
  async getCountries() {
    return this.languagePublicService.getCountries();
  }

  @Get('codes')
  async getCodes() {
    return this.languagePublicService.getCodes();
  }

  @Get('languages')
  async getLanguages() {
    return this.languagePublicService.getLanguages();
  }

  @Get()
  async get() {
    return this.languagePublicService.getLanguageMapped();
  }
}
