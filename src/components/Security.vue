<script lang="ts">

import { MeasureService } from '@/services/measure.service';
import { RiskService } from '@/services/risk.service';

export default {   
  props: ['user'],
  data(){
    return{
        measureService: null as MeasureService | null,
        riskService: null as RiskService | null
    }
  },

  mounted: function () {
    this.measureService = new MeasureService(this.user);
    this.riskService = new RiskService(this.user);
    this.riskService.getList();
  }
}
</script>

<template>

</template>