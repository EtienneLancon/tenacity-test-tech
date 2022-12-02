import type { User } from '@/classes/user';
import axios from 'axios';

export abstract class AbstractHttpService{
    protected $http = axios;
    protected baseUrl: string = "https://technical-test.tools.tenacy.io";
    private user: User;

    constructor(user: User){
        this.user = user;
    }

    protected async get(url: string){
        const config = {
            headers: {
                Authorization: 'Bearer '+this.user.getToken()
            }
        }
        return await this.$http.get(this.baseUrl+url, config);
    }
}