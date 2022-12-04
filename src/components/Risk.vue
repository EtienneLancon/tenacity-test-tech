<script lang="ts">
    export default {
        props: ['risk']
    }
</script>

<template>
    <div class="tuile">
        <p>{{risk.name}}</p>
        <p>Sévérité : {{risk.severity}}</p>
        <p>Couverture : {{risk.coverage}}</p>
    </div>
</template>

<style scoped>
    .tuile{
        width: 25vw;
        border: 1px solid #CCCCCC;
        border-radius: .33em;
        margin: .5em 0 0 0;
        padding: 0 0 0 .5em;
    }
</style>