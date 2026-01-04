import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LanguageModule } from '@/museum/language/language.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '@/museum/item/item.entity';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('CHATBOT_API_URL'),
      }),
    }),
    TypeOrmModule.forFeature([Item]),
    LanguageModule,
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
