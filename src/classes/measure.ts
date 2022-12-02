import type { MeasureInterface } from '@/interfaces/measure.interface'

export class Measure{
    name: string;
    identifier: string;
    cost: number;

    constructor(risk: MeasureInterface){
        this.name = risk.name;
        this.identifier = risk.identifier;
        this.cost = risk.cost;
    }
}