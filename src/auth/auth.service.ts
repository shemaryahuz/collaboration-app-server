import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    private async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async signUp(signupDto: SignupDto): Promise<string> {

        const existingUser = await this.usersService.findOneByEmail(signupDto.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const user = await this.usersService.createUser(
            signupDto
        );

        const token = 'JWT_TOKEN'; // Replace with actual JWT token generation logic

        return token;
    }

    async login(loginDto: LoginDto): Promise<string> {
        const { email, password } = loginDto;

        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await this.comparePasswords(password, user.passwordHash);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = 'JWT_TOKEN'; // Replace with actual JWT token generation logic
        return token;
    }
}
