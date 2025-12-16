import createBaseController from '@/base/base.controller';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { Language } from './language.entity';
import { LanguageDto } from './language.dto';
import { Controller } from '@nestjs/common';
import { LanguageService } from './language.service';
import { RegisterPermission } from '@/permission/decorators';

@Controller('languages')
@ApiTags('languages')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RegisterPermission({
  name: 'LanguageController',
  description: 'Language management',
})
export class LanguageController extends createBaseController(
  Language,
  LanguageDto,
) {
  constructor(readonly languageService: LanguageService) {
    super(languageService);
  }
}
