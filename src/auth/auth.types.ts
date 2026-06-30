import { UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AUTH_ERROR_MESSAGES } from './auth.constants.js';

export interface JwtPayload {
    sub: string;
}

export interface AuthenticatedUser {
    id: string;
}

export type AuthenticatedRequest = Request & {
    user?: AuthenticatedUser;
};

export function getAuthenticatedUserId(req: AuthenticatedRequest): string {
    const userId = req.user?.id;

    if (!userId) {
        throw new UnauthorizedException(AUTH_ERROR_MESSAGES.noToken);
    }

    return userId;
}
