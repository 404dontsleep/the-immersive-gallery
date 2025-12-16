import { LanguageCountry } from './language-country.entity';
import { LanguageCountryService } from './language-country.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { RegisterPermission } from '@/permission/decorators';
import createBaseController from '@/base/base.controller';
import { LanguageCountryDto } from './language-country.dto';

@Controller('language-countries')
@ApiTags('language-countries')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RegisterPermission({
  name: 'LanguageCountryController',
  description: 'Language country management',
})
export class LanguageCountryController extends createBaseController(
  LanguageCountry,
  LanguageCountryDto,
) {
  constructor(readonly languageCountryService: LanguageCountryService) {
    super(languageCountryService);
  }
}

