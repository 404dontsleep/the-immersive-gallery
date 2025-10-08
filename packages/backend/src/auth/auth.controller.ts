import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { GetConfigDto } from './dtos/get-config.dto';
import { GoogleAuthResponseDto } from './dtos/google-auth-response.dto';
import { GoogleAuthDto } from './dtos/google-auth.dto';
import {
  DefaultParentName,
  RequirePermission,
  RegisterPermission,
  RegisterPermissionMethod,
} from '@/permission/decorators';
import { AuthInfo } from './decorators/auth-info.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionGuard } from '@/permission/guards/permission.guard';

@Controller('auth')
@RegisterPermission({
  name: 'AuthController',
  description: 'Auth Permission',
  parentNames: [DefaultParentName.User],
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Google auth',
    type: GoogleAuthResponseDto,
  })
  @Post('google')
  async googleAuth(
    @Body() googleAuthDto: GoogleAuthDto,
  ): Promise<GoogleAuthResponseDto> {
    return await this.authService.verifyGoogleToken(googleAuthDto.token);
  }

  @ApiResponse({ status: 200, description: 'Get config', type: GetConfigDto })
  @Get('config')
  async config(): Promise<GetConfigDto> {
    return this.authService.getClient();
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RegisterPermissionMethod({
    name: 'Me',
    description: 'View data',
  })
  @ApiResponse({
    status: 200,
    description: 'Get me',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        permissions: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Get('me')
  @RequirePermission('Me')
  async me(
    @AuthInfo() user: { email: string; permissions: string[] },
  ): Promise<{
    email: string;
    permissions: string[];
  }> {
    return user;
  }
}
