<script lang="ts">
    export default {
        props: ['measure'],
        methods:{
            emit(){
                this.$emit('toggle', this.measure);
            }
        }
    }
</script>

<template>
    <div class="tuile" @click="emit">
        {{measure.name}} <span style="float: right;">{{measure.cost}}k€</span>
    </div>
</template>

<style scoped>
    .tuile{
        width: 25vw;
        border: 1px solid #CCCCCC;
        border-radius: .33em;
        margin: .5em 0 0 0;
        padding: .5em;
    }
    .tuile:hover{
        background-color: #EEEEEE;
        cursor: pointer;
    }
</style>