import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { CookieOptions, Response } from 'express';

import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

const TOKEN_COOKIE_NAME = 'token';
const TOKEN_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
};

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    private setTokenCookie(res: Response, token: string) {
        res.cookie(TOKEN_COOKIE_NAME, token, TOKEN_COOKIE_OPTIONS);
    }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.signup(signupDto);

        this.setTokenCookie(res, token);

        return { message: 'Signup successful' };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(loginDto);

        this.setTokenCookie(res, token);

        return { message: 'Login successful' };
    }
}
