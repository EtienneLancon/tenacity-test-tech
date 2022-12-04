import { AbstractHttpService } from './abstract-http.service';

import { Measure } from '@/classes/measure';
import type { UserService } from './user.service';
import type { MeasureInterface } from "@/interfaces/measure.interface";

import { Combination } from '@/classes/combination';

export class MeasureService extends AbstractHttpService{
    private list: Measure[] | undefined;
    private i: number = 0;
    private bestCombination: Combination | undefined;

    constructor(userService: UserService){
        super(userService);
    }

    public async getList(): Promise<Measure[]>{
      if(!this.list){
        try {
          let list: Measure[] = [];

          const response = await super.get("/measure");
          
          response?.data.forEach((item: MeasureInterface) => {
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

    public async testMeasures(): Promise<Measure[]>{
      if(this.list){
        for(let measure of this.list){
          this.play([measure]).then(response =>{
            if(response?.status == 200)
            {
              response.data.risks.forEach((risk: any) => {
                measure.listEfficiency.push({riskIdentifier: risk.identifier, coverage: risk.coverage, severity: risk.severity});
              });
              measure.score = response.data.score;
            }
          });
        }
        return this.list;
      }
      return [];
    }

    public async play(listMeasures: Measure[]){
      try{
        let data: any = {measures: []};

        if(listMeasures.length <= 3){
          listMeasures.forEach((measure: Measure) =>{
            data.measures.push(measure.identifier);
          });
  
          const response = await super.post("/play", data);
          
          return response;
        }

      }catch(error){
        console.log(error);
      }
    }

    public selectBestMeasures(): Measure[]{
      if(this.list){
        let orderedList = this.list?.filter(measure => measure.score > 0).sort((a, b) => {
            if(a.score < b.score)
              return 1;

            if(a.score > b.score)
              return -1;

            return 0;
          });

          this.i = 0;

          if(!this.bestCombination)
            this.bestCombination = this.getBestCombinationWith(orderedList);

        return this.bestCombination.listMeasure;
      }
      return [];
    }

    private getBestCombinationWith(measures: Measure[]): Combination{

      let listCombination: Combination[] = [new Combination()];

      if(this.list){

        this.i++;

        for(const measure of measures){
          if(listCombination[0].addMeasure(measure) === true){
            if(listCombination[0].listMeasure.length == 1){
              const reIndexedMeasures1 = JSON.parse(JSON.stringify(measures));

              reIndexedMeasures1.shift();

              listCombination[1] = this.getBestCombinationWith(reIndexedMeasures1);
            }
            else if(listCombination[0].listMeasure.length == 2){
              const reIndexedMeasures2 = JSON.parse(JSON.stringify(measures));

              reIndexedMeasures2.shift();
              reIndexedMeasures2.shift();

              listCombination[2] = this.getBestCombinationWith(reIndexedMeasures2);


              const reIndexedMeasures3 = JSON.parse(JSON.stringify(measures));

              reIndexedMeasures3.splice(1, 1);

              listCombination[3] = this.getBestCombinationWith(reIndexedMeasures3);
            }
          }
        }        
      }

      listCombination.sort((a, b) => {
        if(a.score < b.score)
          return 1;

        if(a.score > b.score)
          return -1;

        return 0;
      });
      
      return listCombination.shift() ?? new Combination();
    }
}