import {
  DefaultParentName,
  DESCRIPTION_PERMISSIONS_KEY,
  REGISTER_PERMISSIONS_KEY,
  RegisterPermissionType,
} from '@/permission/decorators';
import { Permission } from '@/permission/permission.entity';
import { PermissionService } from '@/permission/permission.service';
import { Injectable, Logger } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';

@Injectable()
export class PermissionSeedService {
  private readonly logger = new Logger(PermissionSeedService.name);
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly permissionService: PermissionService,
  ) {}

  async run() {
    this.permissionService.clearCacheByPrefix('Permission', true);
    var controllers = {};
    var descriptions = {};
    for (const moduleRef of this.modulesContainer.values()) {
      if (moduleRef.controllers) {
        for (const controllerWrapper of moduleRef.controllers.values()) {
          if (
            controllerWrapper.metatype &&
            Reflect.hasMetadata(
              REGISTER_PERMISSIONS_KEY,
              controllerWrapper.metatype,
            )
          ) {
            controllers[controllerWrapper.metatype.name] = Reflect.getMetadata(
              REGISTER_PERMISSIONS_KEY,
              controllerWrapper.metatype,
            );
          }
          if (
            controllerWrapper.metatype &&
            Reflect.hasMetadata(
              DESCRIPTION_PERMISSIONS_KEY,
              controllerWrapper.metatype,
            )
          ) {
            descriptions[controllerWrapper.metatype.name] = Reflect.getMetadata(
              DESCRIPTION_PERMISSIONS_KEY,
              controllerWrapper.metatype,
            );
          }
        }
      }
    }
    for (const controller of Object.keys(controllers)) {
      const controllerMetadata: RegisterPermissionType =
        controllers[controller];
      const description = descriptions[controller];
      for (const permission of Object.keys(controllerMetadata)) {
        const count = await this.permissionService.count({
          where: {
            name: permission,
          },
        });
        let permissionEntity: Permission | null = null;
        if (count === 0) {
          permissionEntity = await this.permissionService.create({
            name: permission,
            description: description[permission] || permission,
            canDelete: false,
            isLocked: true,
          });
          this.logger.log(`Created permission: ${permission}`);
        } else {
          permissionEntity = await this.permissionService.findOne({
            where: {
              name: permission,
            },
          });
        }
        for (const parent of controllerMetadata[permission]) {
          if (parent === DefaultParentName.Unspecified) {
            continue;
          }
          const count = await this.permissionService.count({
            where: {
              name: parent,
            },
          });
          if (count === 0) {
            await this.permissionService.create({
              name: parent,
              description: description[parent] || parent,
              canDelete: false,
              children: [permissionEntity],
              isLocked: true,
            });
            this.logger.log(`Created parent permission: ${parent}`);
          } else {
            const parentEntity = await this.permissionService.findOne({
              where: {
                name: parent,
              },
              relations: ['children'],
            });
            if (
              parentEntity &&
              !parentEntity.children.some(child => child.name === permission)
            ) {
              parentEntity.children = [
                ...(parentEntity.children ?? []),
                permissionEntity,
              ];
              await this.permissionService.create(parentEntity);
              this.logger.log(`Updated parent permission: ${parent}`);
            }
          }
        }
      }
    }
  }
}
