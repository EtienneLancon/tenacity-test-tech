import type { UserService } from './user.service';
import { Env } from '@/env/env';
import axios from 'axios';

export abstract class AbstractHttpService{
    protected $http = axios;
    private userService: UserService;
    private config = {};

    constructor(userService: UserService){
        this.userService = userService;
        this.config = {
            headers: {
                Authorization: 'Bearer '+this.userService.getUser()?.getToken()
            }
        };
    }

    protected async get(url: string){
        let response;

        try{
            response = await this.$http.get(Env.baseUrl+url, this.config);
        }
        catch(error: any){
            this.handleError(error);

            response = null;
        }
        
        return response;
    }

    protected async post(url: string, data: any){
        let response;

        try{
            response = await this.$http.post(Env.baseUrl+url, data, this.config);
        }
        catch(error: any){
            this.handleError(error);

            response = null;
        }
        
        return response;
    }

    private handleError(error: any){
        if(error.response?.status == 403)
        {
            this.config = {};
            this.userService.disconnect();
        }
    }
}