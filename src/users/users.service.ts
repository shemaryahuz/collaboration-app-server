import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, name } = createUserDto;
        const passwordHash = await this.hashPassword(password);

        return this.prisma.user.create({
            data: { email, passwordHash, name },
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
