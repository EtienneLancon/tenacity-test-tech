import type { UserLoginInterface } from '@/interfaces/user-login.interface';

export class User{
    name: string;
    email: string;
    private token: string;

    constructor(userLogin: UserLoginInterface){
        this.name = userLogin.name;
        this.email = userLogin.email;
        this.token = '';
    }

    public setToken(token: string): this {
        this.token = token;

        return this;
    }

    public getToken(): string{
        return this.token;
    }
}