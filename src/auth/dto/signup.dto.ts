import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
}