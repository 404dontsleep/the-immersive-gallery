import { LanguageCode } from './language-code.entity';
import { LanguageCodeService } from './language-code.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';
import { RegisterPermission } from '@/permission/decorators';
import createBaseController from '@/base/base.controller';
import { LanguageCodeDto } from './language-code.dto';

@Controller('language-codes')
@ApiTags('language-codes')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RegisterPermission({
  name: 'LanguageCodeController',
  description: 'Language code management',
})
export class LanguageCodeController extends createBaseController(
  LanguageCode,
  LanguageCodeDto,
) {
  constructor(readonly languageCodeService: LanguageCodeService) {
    super(languageCodeService);
  }
}
