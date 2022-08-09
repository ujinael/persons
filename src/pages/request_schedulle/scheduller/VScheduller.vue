<template>
<div class="  wrapper  page_component">
<div class="calendar-container ">
<div class="employers-container">
<div class="employers">
<div v-for="employer of employerSchedulles" class="employer" 
:key="employer.id"
:style="colStyle"
>
<div class="title">
    {{employer.employerPosition?.employerTitle}}

</div>
<div class="position">
        {{employer.employerPosition?.position?.title}}

</div>
</div>
</div>
</div> 
<div class="timeslots-container">
<div class="timeslots" v-for="timeslot of timeslots" 
:key="timeslot">
{{timeslot}}
</div>
</div>
<div class="main-container">
    <div class="time-columns">
        
    <VSchedullerColumn v-for="item in employerSchedulles" 
:style = "colStyle"
:key="item.id"
:timeStep="timeStep"
:start="start"
:end="end"
:employerSchedulle="item"
:rowHeight="rowHeight"
/>    
    </div>
</div>
</div>
    </div>
</template>
<script lang="ts" setup>
import VSchedullerColumn from './VSchedullerColumn.vue';
import { computed} from 'vue';
import { useSchedullerHooks } from '../../../composition';
import { EmployerSchedulle } from '../../../stores/models/employer_schedulle/EmployerSchedulle';

const props = defineProps<{
employerSchedulles:EmployerSchedulle[],
start:Date,
end:Date,
rowHeight:number,
timeStep:number
colWidth:number
}>()
const colStyle = computed(()=> {return {width:`${props.colWidth}px`}})
const {timeslots} = useSchedullerHooks(props.start,props.end,props.timeStep)

</script>

<style lang="scss" scoped>
@import '../../../assets/page-component.scss';

.wrapper{
    width: 100%;
        display: grid;
            height: 100%;

}
.calendar-container{
height: 100%;
    display: grid;
    grid-template-columns: 50px auto;
    gap: 2px 2px;
    grid-template-areas: 
    ". header"
    "timeslots-container main";
   
}
.employers-container{
    grid-area: header;
    margin: 0px;
    position: sticky;
    top:0px;
    z-index: 20;
}

.employers,.time-columns{
display: grid;
grid-auto-flow: column;
justify-content: left;
gap:0px var(--employerVGap);
}
.employer{
    font-family:Georgia, 'Times New Roman', Times, serif;
    color: rgb(0, 0, 0);
    box-shadow: 1px 1px 5px lightgrey;
    background-color: lightgray;
}
.main-container{
grid-area:main;
display: grid;
}
.timeslots-container{
  grid-area: timeslots-container;  
  justify-content: left; 
  display: grid;
  grid-template-columns: 1fr;
  gap:1px
}
.timeslots{
width: 100%;
align-items: center;    
position: relative;
margin: 0px;
}

</style>