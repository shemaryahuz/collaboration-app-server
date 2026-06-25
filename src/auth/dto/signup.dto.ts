import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AUTH_VALIDATION_MESSAGES } from '../auth.constants.js';

export class SignupDto {
    @IsNotEmpty({ message: AUTH_VALIDATION_MESSAGES.nameRequired })
    name: string;

    @IsNotEmpty({ message: AUTH_VALIDATION_MESSAGES.emailRequired })
    @IsEmail({}, { message: AUTH_VALIDATION_MESSAGES.invalidEmail })
    email: string;

    @IsNotEmpty({ message: AUTH_VALIDATION_MESSAGES.passwordRequired })
    @MinLength(6, { message: AUTH_VALIDATION_MESSAGES.passwordTooShort })
    password: string;
}