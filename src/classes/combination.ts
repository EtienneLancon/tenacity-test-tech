import type { Measure } from "./measure";
import type { EfficiencyInterface } from '@/interfaces/efficiency.interface';

export class Combination{
    listMeasure: Measure[] = [];
    cost: number = 0;
    listEfficiency: EfficiencyInterface[] = [];
    score: number = 0;

    constructor(){}

    private isOverlaping(measure: Measure): boolean{
        if(this.listEfficiency.length == 3)
            return true;

        if(measure.cost + this.cost > 100)
            return true;
            
        for(let i = 0; i < this.listEfficiency.length; i++){
            if(measure.listEfficiency[i].coverage + this.listEfficiency[i].coverage > 100)
                return true;
        }

        return false;
    }

    public addMeasure(measure: Measure): boolean{
        if(!this.isOverlaping(measure)){
            this.listMeasure.push(measure);

            this.cost += measure.cost;
            this.score += measure.score;

            measure.listEfficiency.forEach((efficiency: EfficiencyInterface) =>{
                this.updateListEfficiency(efficiency);
            });
            
            return true;
        }
        return false;
    }

    private updateListEfficiency(newEfficiency: EfficiencyInterface){
        for(let localEfficiency of this.listEfficiency){
            if(newEfficiency.riskIdentifier == localEfficiency.riskIdentifier){
                localEfficiency.coverage += newEfficiency.coverage;
                return;
            }
        }

        this.listEfficiency.push(newEfficiency);
    }
}