import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PermissionModule } from './permission/permission.module';
import { SysConfigModule } from './sys-config/sys-config.module';
import { ItemTypeModule } from './inventory/item-type/item-type.module';
import { TransactionModule } from './transaction/transaction.module';
// import { BankModule } from './bank/bank.module';
import { SysCronModule } from './sys-cron/sys-cron.module';
// import { BankResultModule } from './bank-result/bank-result.module';

import { ExportPermissionModule } from './permission/export-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SysCronModule,
    DatabaseModule,
    PermissionModule,
    AuthModule,
    UserModule,
    SysConfigModule.forRoot(),
    ItemTypeModule,
    TransactionModule,
    // BankModule,
    // BankResultModule,
    ExportPermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
