import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  DefaultParentName,
  GUARD_PERMISSIONS_KEY,
} from '../decorators/register-permission.decorator';
import { UserService } from '@/user/user.service';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => PermissionService))
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get(
      GUARD_PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true;
    }

    const _requiredPermission = `${context.getClass().name}.${requiredPermission}`;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.email) {
      throw new ForbiddenException();
    }

    let userEntity = await this.userService.findOne({
      where: { email: user.email },
    });

    if (!userEntity) {
      throw new ForbiddenException();
    }

    const _userEntity = await this.userService.findOneWithPermissions(
      userEntity.id,
    );


    if (!_userEntity) {
      throw new ForbiddenException();
    }

    user.info = await this.userService.findOneWithInventories(userEntity.id);

    let flatPermissions = [];
    if (user.permissions && user.permissions.length) {
      flatPermissions = user.permissions;
    } else {
      if (!_userEntity.permissions.length) {
        const userPermission = await this.permissionService.findOne({
          where: {
            name: DefaultParentName.User,
          },
        });
        if (!userPermission) {
          throw new ForbiddenException();
        }

        await this.userService.updateWithPermissions(_userEntity.id, [
          {
            id: userPermission.id,
          },
        ]);
      }
      flatPermissions = _userEntity.permissions.map(
        permission => permission.name,
      );
    }
    flatPermissions =
      await this.permissionService.flatPermissions(flatPermissions);
    user.permissions = flatPermissions;
    return flatPermissions.some(
      permission => _requiredPermission === permission,
    );
  }
}
