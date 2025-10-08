import { Module } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { PermissionSeedModule } from './permission/permission.seed.module';
import { SeedService } from './seed.service';

@Module({
  imports: [AppModule, PermissionSeedModule],
  controllers: [],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
