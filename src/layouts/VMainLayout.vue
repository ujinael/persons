<template>
<div class="layout">
    <header>
<VHeader/>
</header>
<main>
      <router-view/>
</main>
<VAside/>
</div>
</template>
<script lang="ts">
export default {
    name:'main-layout'
}
</script>
<script setup lang="ts">
import VHeader from './components/VHeader.vue';
import VAside from './components/VAside.vue';

</script>
<style scoped lang="scss">
.layout{
height: 100vh;
width: 100vw;
display: grid;
grid-template-rows:50px 1fr; 
grid-template-columns: min-content 1fr;   
}

header{
    background-color: lightblue;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 1/3;
}
main{
display: grid;
padding: 1rem;
box-sizing: border-box;
height: 100%;
width: 100%;
background-color: whitesmoke;
grid-row: 2/3;
grid-column: 2/3;
overflow: auto;
}

</style>