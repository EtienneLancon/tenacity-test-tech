import { AbstractHttpService } from './abstract-http.service';

import { Measure } from '@/classes/measure';
import type { User } from '@/classes/user';
import type { MeasureInterface } from "@/interfaces/measure.interface";

export class MeasureService extends AbstractHttpService{
    private list: Measure[] | undefined;

    constructor(user: User){
        super(user)
    }

    public async getList(): Promise<Measure[]>{
      if(!this.list){
        try {
          let list: Measure[] = [];

          const response = await super.get("/measure");
          
          response.data.forEach((item: MeasureInterface) => {
            list.push(new Measure(item));
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