import { Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { USER_ERROR_MESSAGES, USER_SUCCESS_MESSAGES } from './users.constants.js';
import { getAuthenticatedUserId, type AuthenticatedRequest } from '../auth/auth.types.js';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getCurrentUser(@Req() req: AuthenticatedRequest) {
        const userId = getAuthenticatedUserId(req);
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException(USER_ERROR_MESSAGES.userNotFound);
        }

        return { user, message: USER_SUCCESS_MESSAGES.userRetrieved };
    }

    @Get('search')
    async searchUsers(@Query('email') email: string) {
        const users = await this.usersService.findManyByEmail(email);

        if (!users) {
            throw new NotFoundException(USER_ERROR_MESSAGES.userNotFound);
        }

        return { users, message: USER_SUCCESS_MESSAGES.userRetrieved };
    }
}
