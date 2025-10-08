import { PermissionModule } from '@/permission/permission.module';
import { Module } from '@nestjs/common';
import { PermissionSeedService } from './permission.seed.service';

@Module({
  imports: [PermissionModule],
  controllers: [],
  providers: [PermissionSeedService],
  exports: [PermissionSeedService],
})
export class PermissionSeedModule {}
