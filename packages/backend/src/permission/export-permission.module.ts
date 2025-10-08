import { Module } from '@nestjs/common';
import { ExportPermissionController } from './export-permission.controller';
import { SysConfigModule } from '@/sys-config/sys-config.module';
import TestConfig from './test/test.config';

@Module({
  imports: [SysConfigModule.forFeatures([TestConfig])],
  controllers: [ExportPermissionController],
})
export class ExportPermissionModule {}
