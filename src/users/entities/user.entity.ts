import { Exclude } from "class-transformer";

export class User {
    id: string;
    name: string | null;
    email: string;

    @Exclude()
    passwordHash: string;
}