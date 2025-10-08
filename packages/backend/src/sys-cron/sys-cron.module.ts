import { Global, Module } from '@nestjs/common';
import { SysCronController } from './sys-cron.controller';
import { SysCronService } from './sys-cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysCron } from './sys-cron.entity';
import { DiscoveryModule, MetadataScanner } from '@nestjs/core';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { SysCronRegister } from './sys-cron.register';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([SysCron]),
    DiscoveryModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [SysCronController],
  providers: [
    MetadataScanner,
    SchedulerRegistry,
    SysCronService,
    SysCronRegister,
  ],
  exports: [SysCronService],
})
export class SysCronModule {}
