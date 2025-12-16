import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageCode } from './language-code.entity';
import { LanguageCodeController } from './language-code.controller';
import { Module } from '@nestjs/common';
import { LanguageCodeService } from './language-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageCode])],
  controllers: [LanguageCodeController],
  providers: [LanguageCodeService],
})
export class LanguageCodeModule {}
