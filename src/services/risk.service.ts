import { AbstractHttpService } from './abstract-http.service';

import { Risk } from '@/classes/risk';
import type { UserService } from './user.service';
import type { RiskInterface } from "@/interfaces/risk.interface";

export class RiskService extends AbstractHttpService{
    private list: Risk[] | undefined;

    constructor(userService: UserService){
        super(userService);
    }

    public async getList(): Promise<Risk[]>{
      if(!this.list){
        try {
          let list: Risk[] = [];

          const response = await super.get("/risk");
          
          response?.data.forEach((item: RiskInterface) => {
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

    public updateRisks(risks: RiskInterface[]): Risk[]{
      if(this.list){
        risks.forEach((coveredRisk: any) => {
          for(let risk of this.list){
            if(coveredRisk?.identifier == risk.identifier){
              risk.coverage = coveredRisk.coverage;
            }
          }
        });
        return this.list;
      }
      return [];
    }
}