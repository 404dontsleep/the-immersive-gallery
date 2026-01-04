import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PermissionModule } from './permission/permission.module';
import { SysConfigModule } from './sys-config/sys-config.module';
import { ItemTypeModule } from './inventory/item-type/item-type.module';
import { MuseumModule } from './museum/museum.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ExportPermissionModule } from './permission/export-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    PermissionModule,
    AuthModule,
    UserModule,
    SysConfigModule.forRoot(),
    ItemTypeModule,
    MuseumModule,
    ExportPermissionModule,
    ChatbotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
