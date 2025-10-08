import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { SysConfigController } from './sys-config.controller';
import { SysConfigService } from './sys-config.service';
import { SysConfig } from './sys-config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysConfigProvide } from './sys-config.provide';

@Global()
@Module({})
export class SysConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: SysConfigModule,
      imports: [TypeOrmModule.forFeature([SysConfig])],
      controllers: [SysConfigController],
      providers: [SysConfigService],
      exports: [SysConfigService],
    };
  }
  static forFeatures(configs: Type<SysConfigProvide>[]): DynamicModule {
    const providers = configs.map(configItem => {
      const configInstance = new configItem();

      const token = `SYS_CONFIG_${configInstance.key}`;

      return {
        provide: token,
        useFactory: async (service: SysConfigService) => {
          let dbConfig = await service.findOne({
            where: { key: configInstance.key },
          });

          if (!dbConfig) {
            dbConfig = await service.create({
              key: configInstance.key,
              description: configInstance.description,
              value: configInstance.value,
              allowPermission: configInstance.allowPermission,
            });
          }

          return () => {
            return service.findOne({
              where: { key: configInstance.key },
            });
          };
        },
        inject: [SysConfigService],
      };
    });

    return {
      module: SysConfigModule,
      providers: [...providers],
      exports: providers.map(provider => provider.provide),
    };
  }
}
