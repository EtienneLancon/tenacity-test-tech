import axios from 'axios';

import { User } from '@/classes/user';
import { Env } from '@/env/env';

import { Subject, Observable } from 'rxjs';

export class UserService{
    private $http = axios;
    
    private user: User | null = null;
    private userSubject = new Subject<User | null>();

    constructor(){}

    public async connect(name: string, email: string): Promise<User | null>{
        try{
            const data = {name: name, email: email};

            const response = await this.$http.post(Env.baseUrl+'/register', data);

            this.user = new User(data);

            this.user.setToken(response.data.token);

            window.localStorage.setItem('user', JSON.stringify(this.user));

            this.setUser(this.user);

            return this.user;

        }catch(error){
            console.log(error);
            return null;
        }
    }

    public disconnect(): null {
        window.localStorage.removeItem('user');
        
        this.setUser(null);

        return null;
    }

    public getLocalStorageUser(): User | null{
        const userStr = window.localStorage.getItem('user');
        
        if(userStr)
        {
            const localUser = JSON.parse(userStr);

            const user = new User({name: localUser.name, email: localUser.email}).setToken(localUser.token);

            this.setUser(user);

            return user;
        }
        else{
            this.setUser(null);
            return null
        }
    }

    public listen(): Observable<User |null>{
        return this.userSubject.asObservable();
    }

    public setUser(user: User | null): void{
        this.user = user;
        this.userSubject.next(user);
    }

    public getUser(): User | null{
        return this.user;
    }
}