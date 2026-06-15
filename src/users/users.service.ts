import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOneByEmail(email: string): Promise<{ id: string; email: string; passwordHash: string } | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async createUser(email: string, passwordHash: string, name?: string): Promise<{ id: string; email: string; passwordHash: string }> {
        return this.prisma.user.create({
            data: { email, passwordHash, name },
        });
    }
}
