import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service.js';
import { AUTH_ERROR_MESSAGES } from './auth.constants.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    private async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private async generateToken(user: User): Promise<string> {
        const payload = { id: user.id, email: user.email, name: user.name };

        return this.jwtService.sign(payload);
    }

    async signup(signupDto: SignupDto): Promise<string> {

        const existingUser = await this.usersService.findOneByEmail(signupDto.email);
        if (existingUser) {
            throw new ConflictException(AUTH_ERROR_MESSAGES.emailExists);
        }

        const user = await this.usersService.createUser(
            signupDto
        );

        return await this.generateToken(user);
    }

    async login(loginDto: LoginDto): Promise<string> {
        const { email, password } = loginDto;

        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException(AUTH_ERROR_MESSAGES.invalidCredentials);
        }

        const isMatch = await this.comparePasswords(password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException(AUTH_ERROR_MESSAGES.invalidCredentials);
        }

        return await this.generateToken(user);
    }
}
