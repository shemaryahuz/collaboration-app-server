import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { CookieOptions, Response } from 'express';

import { AuthService } from './auth.service.js';
import {
    AUTH_SUCCESS_MESSAGES,
    TOKEN_COOKIE_MAX_AGE,
    TOKEN_COOKIE_NAME
} from './auth.constants.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

const TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_COOKIE_MAX_AGE,
};

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private setTokenCookie(res: Response, token: string) {
        res.cookie(TOKEN_COOKIE_NAME, token, TOKEN_COOKIE_OPTIONS);
    }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.signup(signupDto);

        this.setTokenCookie(res, token);

        return { message: AUTH_SUCCESS_MESSAGES.signup };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(loginDto);

        this.setTokenCookie(res, token);

        return { message: AUTH_SUCCESS_MESSAGES.login };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie(TOKEN_COOKIE_NAME, TOKEN_COOKIE_OPTIONS);

        return { message: AUTH_SUCCESS_MESSAGES.logout };
    }
}
