import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getCurrentUser(@Req() req: Request) {
        const user = req.user;
        return { user, message: 'User retrieved successfully' };
    }
}
