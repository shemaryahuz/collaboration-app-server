import { Exclude } from "class-transformer";

export class User {
    id: string;
    name: string | null;
    email: string;

    @Exclude()
    passwordHash: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}