<template>
  <div class="column" ref="column">
    <VSchedullerCell
      v-for="cell in timeCells"
      :key="cell.number"
      :cell="cell"
      @dblclick="createEvent($event, cell)"
    />
    <TransitionGroup name="fade">
       <VSchedulleEvent
      v-for="event in events"
      :key="event.start.getMilliseconds()"
      :item="event"
      :minutes-in-pixel="minutesInPixel"
      @resize-start="startResize"
    />
    </TransitionGroup>
   
  </div>
</template>

<script lang="ts" setup>
import VSchedulleEvent from './VSchedulleEvent.vue';
import VSchedullerCell from './VSchedullerCell.vue';
import { useSchedullerHooks } from '../../../composition';
import { EmployerSchedulle } from '../../../stores/models/employer_schedulle/EmployerSchedulle';
import { computed, onMounted, ref } from 'vue';
import { SchedulleEvent } from '../../../stores/models/schedulle_event/schedulle_event';
import { TimeCell } from '../../../stores/models/index.js';
import { useSchedulleEventsStore } from '../../../stores/modules/schedulle_events/useSchedulleEventsStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  employerSchedulle: EmployerSchedulle;
  rowHeight: number;
  start: Date;
  end: Date;
  timeStep: number;
}>();

const store = useSchedulleEventsStore()
const {schedulleEvents} = storeToRefs(store)

const events = computed(()=>{
return schedulleEvents.value.filter(e=>e.employersPositionId === props.employerSchedulle.employerPosition?.id)
})
const parentHeight = ref(0)
const createEvent = (event: MouseEvent, cell: TimeCell) => {
  
  const cell$ = event.target as HTMLDivElement;
  const rect = cell$.getBoundingClientRect();
  const parentRect = column.value!.getBoundingClientRect()
  const newEvent = new SchedulleEvent(
    cell.start,
     cell.end,
      {
    top: rect.top - parentRect.top,
    height: rect.height,
  },
  {gridRowStart:cell.style.gridRowStart
  ,gridRowEnd:cell.style.gridRowEnd
  ,height:rect.height
  },
  {
    top:0
    ,bottom:parentRect.height,
    minHeight:rect.height
  },
  props.employerSchedulle.employerPosition?.id!,
  undefined,
  props.employerSchedulle.employerPosition
  
  );  
  schedulleEvents.value.push(newEvent);
};

const {
  timeCells: getTimeCells,
} = useSchedullerHooks(props.start, props.end, props.timeStep);
const timeCells = getTimeCells(props.employerSchedulle.days[0]!);
const column = ref<HTMLDivElement | null>(null);
const minutesInPixel = computed(()=>{
  if(column.value){
      const rect = column.value.getBoundingClientRect();
  return  (props.timeStep * timeCells.length)/rect.height;
  }
return 0
})
const startResize=(item:SchedulleEvent)=>{
item.constraints.top = getTopConstraint(item)
item.constraints.bottom = getBottomConstraint(item)
}
const getTopConstraint = (item:SchedulleEvent)=>{ 

const upperEvents = events.value.filter(e=>
  e.position.top < item.position.top 
).sort((e1,e2)=> e2.position.top - e1.position.top )
if(upperEvents.length){
  return upperEvents[0].position.top + upperEvents[0].position.height}
return 0
}
const getBottomConstraint = (item:SchedulleEvent)=>{ 
const lowerEvents = events.value.filter(e=>
  e.position.top > item.position.top
).sort((e1,e2)=> e1.position.top - e2.position.top )
if(lowerEvents.length){
  return lowerEvents[0].position.top
  }
return parentHeight.value
}
onMounted(() => {
  if(column.value)
  parentHeight.value = column.value.getBoundingClientRect().height;  
});
</script>

<style lang="scss" scoped>
.column {
  display: grid;
  position: relative;
  font-family: 'Times New Roman', Times, serif;
  color: whitesmoke;
  box-shadow: 1px 1px 5px lightgrey;
  background-color: lightgray;
}

@import '../../../assets/show-animation.css';
</style>
