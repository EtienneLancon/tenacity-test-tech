import type { RiskInterface } from '@/interfaces/risk.interface'

export class Risk{
    name: string;
    identifier: string;
    severity: number;

    constructor(risk: RiskInterface){
        this.name = risk.name;
        this.identifier = risk.identifier;
        this.severity = risk.severity;
    }
}