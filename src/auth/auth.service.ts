import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.js';
import { UsersService } from 'src/users/users.service.js';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async signUp(signupDto: SignupDto): Promise<{ id: string; name: string | null; email: string; }> {
        const { email, password, name } = signupDto;

        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await this.hashPassword(password);

        const user = await this.usersService.createUser(
            email,
            hashedPassword,
            name
        );
        return user;
    }
}
