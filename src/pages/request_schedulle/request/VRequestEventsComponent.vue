<template>
<fieldset 
@drop="dropEvent($event)"
@dragover.prevent>
   <legend>Исполнители</legend>
     <div class="cards" v-if="requestSchedulle">
     <TransitionGroup name="fade">
<VRequestEventCard 
v-for="(item, index) in requestSchedulle.events" :key="index"
:item="item"
/>
     </TransitionGroup>
 </div>

</fieldset>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRequestSchedullesStore } from '../../../stores/modules/request_schedulles/useRequestSchedullesStore';
import { useSchedulleEventsStore } from '../../../stores/modules/schedulle_events/useSchedulleEventsStore';
import VRequestEventCard from './VRequestEventCard.vue'

const store = useRequestSchedullesStore()
const {requestSchedulle} = storeToRefs(store)

const eventsStore = useSchedulleEventsStore()
const {schedulleEvents} = storeToRefs(eventsStore)
  const dropEvent = (e:DragEvent)=>{
const evtId = e.dataTransfer?.getData('event_number')
// console.log(evtId);

const evt = schedulleEvents.value.find(ev => `${ev.start.toISOString() + ev.employersPositionId}` === evtId)

if(!evt) return
if(requestSchedulle.value?.events.find(ev => `${ev.start.toISOString() + ev.employersPositionId}` === evtId))return
requestSchedulle.value?.events.push(evt)
// if (!requestSchedulle.value?.events?.find(p=>p.position?.id == evt?.employer?.id))
//  task.value.events = [...(task.value.events ??[]),evt!]
      }  
      onMounted(()=>{
        store.setRequestSchedulle()
      })
</script>
<style scoped lang="scss">
@import '../../../assets/request_component.scss';
@import '../../../assets/show-animation.css';
</style>