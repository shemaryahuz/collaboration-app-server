import { BadRequestException, Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { USER_ERROR_MESSAGES, USER_SUCCESS_MESSAGES } from './users.constants.js';
import { getAuthenticatedUserId, type AuthenticatedRequest } from '../auth/auth.types.js';
import { User } from './entities/user.entity.js';

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

        return { user: new User(user), message: USER_SUCCESS_MESSAGES.userRetrieved };
    }

    @Get('search')
    async searchUsers(@Query('email') email: string) {
        if (!email) {
            throw new BadRequestException(USER_ERROR_MESSAGES.emailQueryParamRequired);
        }

        const users = await this.usersService.findManyByEmail(email);

        if (!users || users.length === 0) {
            throw new NotFoundException(USER_ERROR_MESSAGES.usersNotFound);
        }

        return { users: users.map((user) => new User(user)), message: USER_SUCCESS_MESSAGES.usersRetrieved };
    }
}
