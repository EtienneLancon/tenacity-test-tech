import axios from 'axios';

import { User } from '@/classes/user';

export class UserService{
    private $http = axios;
    
    private user: User | null = null;

    constructor(){}

    public async connect(name: string, email: string): Promise<User | null>{
        try{
            const data = {name: name, email: email};

            const response = await this.$http.post("https://technical-test.tools.tenacy.io/register", data);

            this.user = new User(data);

            this.user.setToken(response.data.token);

            window.localStorage.setItem('user', JSON.stringify(this.user));

            return this.user;

        }catch(error){
            console.log(error);
            return null;
        }
        
    }

    public getUser(): User | null{
        const userStr = window.localStorage.getItem('user');
        
        if(userStr)
        {
            const localUser = JSON.parse(userStr);
            return new User({name: localUser.name, email: localUser.email}).setToken(localUser.token);
        }
        else{
            return null
        }
    }
}