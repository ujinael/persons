<template>
<td >
  
    <div class="day_cell">
       <div class="day_number" 
        :class="{
            selected:item.selected,
            active:item.status === Status.ACTIVE}"
        :style="{
            backgroundColor:!item.selected ? item.color :preset?.color,
        // color:item.selected ? 'white' :'black'
        }"
       >
        {{item.dayNumber}}
    </div>
    <Transition name="fade">
    <section   v-if="item.status === Status.ACTIVE">
        <div class="day_start">
        {{useDateFormat(item.start,'HH:mm').value}}
    </div>
    <div class="day_end">
        {{useDateFormat(item.end,'HH:mm').value}}
    </div> 
    </section> 
  </Transition>
    </div>
   
   
</td>
</template>
<script setup lang="ts">
import { DaySchedulle, Status } from '../../stores/models/index.js';
import {useDateFormat} from '@vueuse/core'
import { useSchedullePresetsStore } from '../../stores/modules/schedulle_presets/useSchedullePresetsStore.js';
import { storeToRefs } from 'pinia';

const props = defineProps<{
item:DaySchedulle    
}>()
defineExpose({
    item:props.item
})
const presetStore = useSchedullePresetsStore()
const {preset} = storeToRefs(presetStore)

</script>
<style scoped lang="scss">

@import '../../assets/show-animation.css';
td{
    // display: grid;
box-sizing: border-box;
}
.day_number{
    color: black;
    width: 1.5rem;
height: 1.5rem;
padding: .2rem;
border-radius: 50%;
}
.day_cell{
    width: 3rem;
    // height: 3rem;
display: grid;
justify-items: center;
align-items: center;
}
section{
    font-size: small;
    // color: white;
}
.selected{
    transition: all .1s ease-in;
    // background-color: rgb(18, 202, 110);
    color:white;
}
.active{
// box-shadow: var(--common_shadows);
 //var(--common_border_radius);
        color:white;
}
</style>