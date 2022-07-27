

<template>
  <VMessage/>
  <component :is="layout">
  <router-view></router-view>
  </component>
</template>
<script setup lang="ts">
import VMessage from './components/ui-components/VMessage.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const defaultLayout = 'layout-not-connected'
const layout = computed(()=>{  
return route.meta.layout || defaultLayout
})

</script>
<style>
@import './assets/variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    padding: 0px;
  margin: 0px;
  /* margin-top: 60px; */
}
</style>
