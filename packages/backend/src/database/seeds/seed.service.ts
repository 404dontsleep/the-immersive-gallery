// src/database/seed.service.ts
import { Injectable } from '@nestjs/common';
import { PermissionSeedService } from './permission/permission.seed.service';

@Injectable()
export class SeedService {
  constructor(private readonly permissionSeedService: PermissionSeedService) {}

  async run() {
    await this.permissionSeedService.run();
  }
}
