import createBaseService from '@/base/base.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Permission } from './permission.entity';
import {
  PermissionRelationsDto,
  PermissionRelationsDtoUnitType,
} from './dtos/permission-relations.dto';
import { User } from '@/user/user.entity';

@Injectable()
export class PermissionService extends createBaseService(Permission) {
  static readonly FIND_ALL_WITH_RELATIONS_CACHE_PREFIX =
    'Permission:findAllWithRelations';

  async findAllWithRelations(): Promise<Permission[]> {
    return this.repository
      .createQueryBuilder('permission')
      .leftJoin('permission.parents', 'parent')
      .select(['permission.id', 'parent.id'])
      .cache(
        PermissionService.FIND_ALL_WITH_RELATIONS_CACHE_PREFIX,
        this.CACHE_TTL,
      )
      .getMany();
  }
  async updateRelations(
    id: number,
    data: PermissionRelationsDto,
  ): Promise<Permission> {
    const permission = await this.findOne({
      where: { id },
      relations: ['children', 'parents'],
    });

    if (!permission) {
      throw new NotFoundException(`Permission ${id} not found`);
    }

    if (data.children?.length) {
      let currentChildren = permission.children;
      for (const child of data.children) {
        if (child.type === PermissionRelationsDtoUnitType.Add) {
          const childEntity = await this.findOne({
            where: { id: child.id },
          });
          if (!childEntity) {
            throw new NotFoundException(`Child ${child.id} not found`);
          }
          if (await this.hasCircularDependency(id, childEntity.id)) {
            throw new BadRequestException(
              `Cannot assign child ${child.id} to ${id} because it would create a circular dependency.`,
            );
          }
          currentChildren.push({
            id: child.id,
          } as Permission);
        }
        if (child.type === PermissionRelationsDtoUnitType.Remove) {
          currentChildren = currentChildren.filter(c => c.id !== child.id);
        }
      }
      permission.children = currentChildren;
    }

    if (data.parents?.length) {
      let currentParents = permission.parents;
      for (const parent of data.parents) {
        if (parent.type === PermissionRelationsDtoUnitType.Add) {
          const parentEntity = await this.findOne({
            where: { id: parent.id },
          });
          if (!parentEntity) {
            throw new NotFoundException(`Parent ${parent.id} not found`);
          }
          if (await this.hasCircularDependency(parentEntity.id, id)) {
            throw new BadRequestException(
              `Cannot assign parent ${parent.id} to ${id} because it would create a circular dependency.`,
            );
          }
          currentParents.push({
            id: parent.id,
          } as Permission);
        }

        if (parent.type === PermissionRelationsDtoUnitType.Remove) {
          currentParents = currentParents.filter(p => p.id !== parent.id);
        }
      }
      permission.parents = currentParents;
    }
    await this.clearCacheByPrefix(
      PermissionService.FIND_ALL_WITH_RELATIONS_CACHE_PREFIX,
    );
    return this.create(permission);
  }

  private async hasCircularDependency(
    startId: number,
    targetId: number,
    visited = new Set<number>(),
  ): Promise<boolean> {
    if (startId === targetId) return true;
    if (visited.has(startId)) return false;
    visited.add(startId);

    const node = await this.findOne({
      where: { id: startId },
      relations: ['children'],
    });

    if (!node) return false;

    for (const child of node.children) {
      if (await this.hasCircularDependency(child.id, targetId, visited)) {
        return true;
      }
    }

    return false;
  }

  async flatPermissions(permissions: string[]): Promise<string[]> {
    const result = new Set<string>();
    const visited = new Set<string>();

    const flat = async (permissionNames: string[]) => {
      for (const name of permissionNames) {
        if (visited.has(name)) continue;
        visited.add(name);
        result.add(name);

        const permission = await this.findOne({
          where: { name },
          relations: {
            children: true,
          },
          select: {
            children: {
              id: true,
              name: true,
            },
            name: true,
            id: true,
          },
        });

        if (
          permission &&
          permission.children &&
          permission.children.length > 0
        ) {
          await flat(permission.children.map(c => c.name));
        }
      }
    };

    await flat(permissions);

    return Array.from(result);
  }

  getAllCacheKey(): string[] {
    return [...super.getAllCacheKey(), `${User.name}:permissions`];
  }
}
