import type { MeasureInterface } from '@/interfaces/measure.interface'
import type { EfficiencyInterface } from '@/interfaces/efficiency.interface';

export class Measure{
    name: string;
    identifier: string;
    cost: number;
    listEfficiency: EfficiencyInterface[] = [];
    score: number = 0;

    constructor(risk: MeasureInterface){
        this.name = risk.name;
        this.identifier = risk.identifier;
        this.cost = risk.cost;
    }

    setScore(score: number): this{
        this.score = score;

        return this;
    }

    setListEfficiency(listEfficiency: EfficiencyInterface[]): this{
        this.listEfficiency = listEfficiency;

        return this;
    }
}