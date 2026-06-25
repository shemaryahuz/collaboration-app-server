import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AUTH_ERROR_MESSAGES, JWT_DEFAULT_SECRET, TOKEN_COOKIE_NAME } from './auth.constants.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.[TOKEN_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.noToken);
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET', JWT_DEFAULT_SECRET),
      });
      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.invalidToken);
    }

    return true;
  }
}
