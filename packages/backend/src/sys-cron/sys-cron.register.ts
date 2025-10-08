import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DB_CRON_METADATA, DbCronOptions } from './sys-cron.decorator';
import { SysCronService } from './sys-cron.service';
import { CronJob } from 'cron';
import { SysCron } from './sys-cron.entity';
import { SysCronDto } from './sys-cron.dto';

@Injectable()
export class SysCronRegister implements OnModuleInit {
  private readonly logger = new Logger(SysCronRegister.name);
  private readonly cronJobs: Map<string, () => Promise<void>> = new Map();
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly sysCronService: SysCronService,
  ) {}

  onModuleInit() {
    const providers = this.discovery.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper.instance;

      if (!instance || typeof instance !== 'object') continue;

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        methodKey => {
          const metadata: DbCronOptions = this.reflector.get(
            DB_CRON_METADATA,
            instance[methodKey],
          );

          if (metadata) {
            this.registerJob(instance, methodKey, metadata);
          }
        },
      );
    }
  }
  private async registerJob(
    instance: any,
    methodKey: string,
    metadata: DbCronOptions,
  ) {
    let job = await this.sysCronService.findOne({
      where: { name: metadata.name },
    });

    if (!job) {
      job = await this.sysCronService.create({
        name: metadata.name,
        cronExpression: metadata.expression,
        enabled: true,
      });
    }

    const handler = instance[methodKey].bind(instance);

    this.cronJobs.set(job.name, async () => {
      await this.sysCronService.update(job.id, {
        lastRunAt: new Date().toISOString(),
      });
      await handler();
    });
    await this.autoJob(job);
  }

  async autoJob(job: SysCron) {
    try {
      const _job = this.schedulerRegistry.getCronJob(job.name);
      if (_job) {
        _job.stop();
        this.schedulerRegistry.deleteCronJob(job.name);
      }
    } catch (e) {
      this.logger.error(`❌ Job ${job.name} bị lỗi: ${e}`);
    }

    const handler = this.cronJobs.get(job.name);

    if (!handler) return;

    const cronJob = new CronJob(job.cronExpression, handler);

    this.schedulerRegistry.addCronJob(job.name, cronJob);

    if (job.enabled) {
      cronJob.start();
      this.logger.log(`✅ Job ${job.name} đã bật`);
    } else {
      cronJob.stop();
      this.logger.warn(`❌ Job ${job.name} bị tắt`);
    }
  }

  async updateJob(data: SysCronDto) {
    const job = await this.sysCronService.findOne({
      where: { name: data.name },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.sysCronService
      .update(job.id, {
        enabled: data.enabled,
        cronExpression: data.cronExpression,
      })
      .then(() => this.sysCronService.findOne({ where: { id: job.id } }))
      .then(data => this.autoJob(data));
  }
}
