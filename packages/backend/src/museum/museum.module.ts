import { LanguageModule } from './language/language.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LanguageModule],
})
export class MuseumModule {}
