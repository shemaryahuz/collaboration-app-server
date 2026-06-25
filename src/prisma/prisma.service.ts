import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            adapter: new PrismaPg({
                connectionString: process.env.DATABASE_URL,
            }),
        });
    }

    async onModuleInit() {
        this.$connect();
    }

    async onModuleDestroy() {
        this.$disconnect();
    }
}
