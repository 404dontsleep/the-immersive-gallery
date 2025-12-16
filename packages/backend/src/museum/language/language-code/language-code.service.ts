import { Injectable } from '@nestjs/common';
import createBaseService from '@/base/base.service';
import { LanguageCode } from './language-code.entity';

@Injectable()
export class LanguageCodeService extends createBaseService(LanguageCode) {}
