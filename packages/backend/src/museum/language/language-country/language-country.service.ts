import { Injectable } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { LanguageCountry } from './language-country.entity';

@Injectable()
export class LanguageCountryService extends createBaseService(
  LanguageCountry,
) {}
