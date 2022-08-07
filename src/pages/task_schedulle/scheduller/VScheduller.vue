<template>
<div class="wrapper">
    <div class = 'calendar-container'>

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
    <div class="main">
        
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
<div class="footer">footer</div>
    </div>
    </div>
</template>
<script lang="ts" setup>
import VSchedullerColumn from './VSchedullerColumn.vue';
import { computed, onMounted, ref} from 'vue';
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
.wrapper{
    width: 100%;
}
.header{
padding-bottom: 5px;    
}
.calendar-container{
--hoursRowHeight:v-bind(rowHeight + 'px');
--employerVGap:4px;
    display: grid;
    grid-template-columns: 50px auto;
    grid-template-rows: auto;
    // background: white;
    width: 100%;
    height: 550px;
    overflow:scroll;
    gap: 2px 2px;
    grid-template-areas: 
    ". header"
    "timeslots-container main"
    "footer footer";
}
.footer{
    grid-area: footer;
}
.employers-container{
    grid-area: header;
    margin: 0px;
    position: sticky;
    top:0px;
    z-index: 20;
}

.employers,.main{
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
// background-color:white;
}
.timeslots-container{
// background: rgb(230, 230, 230);;
  grid-area: timeslots-container;  
  justify-content: left; 
  display: grid;
  grid-template-columns: 1fr;
  gap:1px
}
.timeslots{
width: 100%;
height: var(--hoursRowHeight + 'px');
// background-color: white;
align-items: center;    
position: relative;
margin: 0px;
}

</style>