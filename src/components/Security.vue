<script lang="ts">

import { MeasureService } from '@/services/measure.service';
import { RiskService } from '@/services/risk.service';
import type { Risk } from '@/classes/risk';
import type { Measure } from '@/classes/measure';

import MeasureVue from './Measure.vue';
import RiskVue from './Risk.vue';

export default {
  props: ['userService'],
  data(){
    return{
        measureService: null as MeasureService | null,
        riskService: null as RiskService | null,
        listRisk: [] as Risk[] | undefined,
        listMeasure: [] as Measure[],
        listTakenMeasure: [] as Measure[],
        budget: 100 as number,
        score: 0 as number
    }
  },
  methods:{
    initData(){
      this.measureService = new MeasureService(this.userService);
      this.riskService = new RiskService(this.userService);

      this.measureService.getList().then((response: Measure[]) => {
        this.listMeasure = response;
        this.measureService?.testMeasures();
      });
      this.riskService.getList().then((response: Risk[]) => {this.listRisk = response;})
    },

    chooseMeasure(measure: Measure){
      if(this.listTakenMeasure.length < 3){
        this.listTakenMeasure.push(measure);
        this.listMeasure.splice(this.listMeasure.indexOf(measure), 1);
        this.budget -= measure.cost;
      }
    },

    cancelMeasure(measure: Measure){
      this.listMeasure.push(measure);
      this.listTakenMeasure.splice(this.listTakenMeasure.indexOf(measure), 1);
      this.budget += measure.cost;
    },

    validateMeasures(){
      if(this.budget >= 0){
        this.measureService?.play(this.listTakenMeasure).then((response: any) =>{
          if(response?.status == 200){
            this.listRisk = this.riskService?.updateRisks(response.data.risks);
            this.score = response.data.score;
          }
        })
      }
      else{
        this.score = 0;
        this.listRisk?.forEach((risk: Risk) =>{
          risk.coverage = 0;
        });
      }
    },

    selectBestMeasures(){
      while(this.listTakenMeasure.length > 0){
        this.cancelMeasure(this.listTakenMeasure[0]);
      }

      const mesures = this.measureService?.selectBestMeasures();

      mesures?.forEach((measure: Measure) =>{
        this.chooseMeasure(measure);
      });
    }
  },
  components:{
    MeasureVue,
    RiskVue
  },

  mounted: function () {
    this.initData();
  }
}
</script>

<template>
  <div class="tableau">
    <div class="colonne">
      Risques encourus
      <div v-for="risk in listRisk">
        <RiskVue :risk="risk"></RiskVue>
      </div>

      <p :style= "[(budget < 0) ? {'color': 'red'} : {'color': 'black'}]">Budget : {{budget}}k€</p>
      <p>Score : {{score}}</p>

      <button style="margin-bottom: .25em;" @click="validateMeasures">Choisir ces mesures</button>
      <button @click="selectBestMeasures">M'aider</button>

    </div>
    <div class="colonne">
      Liste de mesures disponibles
      <div v-for="measure in listMeasure">
        <MeasureVue :measure="measure" @toggle="chooseMeasure"></MeasureVue>
      </div>
    </div>
    <div class="colonne">
      Mesures à appliquer (max 3)
      <div v-for="measure in listTakenMeasure">
        <MeasureVue :measure="measure" @toggle="cancelMeasure"></MeasureVue>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .colonne{
    display: flex;
    flex-direction: column;
    margin: .5em;
  }

  .tableau{
    display: flex;
    flex-direction: row;
  }
</style>