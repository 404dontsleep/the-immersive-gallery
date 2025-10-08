import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthResponseDto } from './dtos/google-auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { User } from '@/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  getConfig() {
    return {
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
    };
  }

  getClient() {
    return {
      clientId: this.getConfig().clientId,
    };
  }

  async verifyGoogleToken(idToken: string): Promise<GoogleAuthResponseDto> {
    const client = new OAuth2Client({
      clientId: this.getConfig().clientId,
      clientSecret: this.getConfig().clientSecret,
    });
    const ticket = await client.verifyIdToken({
      idToken,
      audience: this.getConfig().clientId,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.picture) {
      throw new Error('Token không hợp lệ hoặc thiếu thông tin email/avatar');
    }

    await this.validateUser(payload.email);

    return {
      accessToken: this.jwtService.sign({
        email: payload.email,
      }),
    } as GoogleAuthResponseDto;
  }

  async validateUser(email: string) {
    const userCount = await this.userService.count({ where: { email } });
    if (userCount === 0) {
      await this.userService.create({
        email,
      } as User);
    }
    return {
      email,
      permission: [],
    };
  }
}
