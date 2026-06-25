import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module.js';
import { JWT_DEFAULT_EXPIRES_IN, JWT_DEFAULT_SECRET } from './auth.constants.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
                secret: configService.get<string>('JWT_SECRET', JWT_DEFAULT_SECRET),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN', JWT_DEFAULT_EXPIRES_IN) as any,
                }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
