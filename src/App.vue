

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
*{
  /* @import '@/assets/base.css'; */

  --common_border_radius:.4rem;
  --common_input_height:2rem;
  --common_input_v_padding:.2rem;
  --common_input_h_padding:.2rem;
  --common_input_line_height:1.2rem;
  --comon_input_fontsize:1.2rem;
  --common_input_border:2px solid gray;
  --common_input_hovered_border:2px solid lightskyblue;
--common_button_shadows:.1rem .1rem .2rem gray;
--common_shadows:.2rem .2rem .6rem gray;

  --accept_color:rgb(29, 193, 144);
  --delete_color:rgb(250, 74, 168);
  --default_color:rgb(46, 174, 253);
  --cancel_color:rgb(117, 115, 115);
  --accept_invert_color:rgb(232, 252, 232);
  --delete_invert_color:rgb(255, 233, 233);
  --default_invert_color:rgb(225, 241, 251);
  --cancel_invert_color:rgb(255, 254, 254);
  padding: 0px;
  margin: 0px;
}
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
