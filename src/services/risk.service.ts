import { AbstractHttpService } from './abstract-http.service';

import { Risk } from '@/classes/risk';
import type { User } from '@/classes/user';
import type { RiskInterface } from "@/interfaces/risk.interface";

export class RiskService extends AbstractHttpService{
    private list: Risk[] | undefined;

    constructor(user: User){
        super(user);
    }

    public async getList(): Promise<Risk[]>{
      if(!this.list){
        try {
          let list: Risk[] = [];

          const response = await super.get("/risk");
          
          response.data.forEach((item: RiskInterface) => {
            list.push(new Risk(item));
          });

          this.list = list;

          return list;
        } catch (error) {
          console.log(error);
          return [];
        }
      }else{
          return this.list;
      }
    }
}