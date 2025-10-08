import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthInfo = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
