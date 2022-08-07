<template>
<div class="event"
 ref="event"
     v-resizable:[item.constraints] = 
         "{ hooks:{
        start:resizeStart,
        resizing:resizing,
              }
              ,resizeStep:10
           }"
 >

<div class="event_content">

<!-- :style="{gridRowStart:item.style.gridRowStart,gridRowEnd:item.style.gridRowEnd}" -->

<div class="event_header">
    {{useDateFormat(item.start,"HH:mm").value }}-{{useDateFormat(item.end,"HH:mm").value }}

</div>
<div class="event_body">

</div>
</div>

</div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { onMounted, onUnmounted, ref } from 'vue';
import { SchedulleEvent } from '../../../stores/models/schedulle_event/schedulle_event.js';

const props = defineProps<{
    item:SchedulleEvent,
    minutesInPixel:number
}>()
const emit = defineEmits<{
    (event: 'resizeStart', item: SchedulleEvent): void
}
>()
const resizeStart = (el:any,resizerType:'top'|'bottom')=>{    
            resize.value = resizerType
emit('resizeStart',props.item)
        }
const resizing = (el:HTMLElement)=>{
props.item.position.height = +el.style.height.replace(/[^0-9]/g,'')
props.item.position.top = +el.style.top.replace(/[^0-9]/g,'')

}
const onResize = (entries:ResizeObserverEntry[])=>{
    
if(event.value){
const height = event.value.clientHeight
if(resize.value === 'bottom')
setEndDate(height)
if(resize.value === 'top')setStartDate(height)
}
}

const setEndDate=(height:number)=>{
const sDate = props.item.start
const newMinutes = props.minutesInPixel * height + sDate.getMinutes()// + 1
const newEDate = new Date(sDate)
newEDate.setMinutes(newMinutes)
props.item.end = newEDate
}
const setStartDate=(height:number)=>{
const eDate = props.item.end
const newMinutes = eDate.getMinutes() - props.minutesInPixel * height// - 1
const newEDate = new Date(eDate)
newEDate.setMinutes(newMinutes)
props.item.start = newEDate
}
const resizeObserver = new ResizeObserver(onResize)
onMounted(()=>{
    
    if(event.value){
        resizeObserver.observe(event.value)        
        event.value.style.height = props.item.position.height + 'px'
        event.value.style.top = props.item.position.top + 'px'
    }
})

onUnmounted(()=>{
 
    resizeObserver.unobserve(event.value!)
})
const event = ref<HTMLDivElement|null>(null)
const resize = ref<'top'|'bottom'>()
</script>
<style scoped lang="scss">
.event{
    position: absolute;
    box-sizing: border-box;
    padding: .2rem;
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}
.event_content{
    border-radius: var(--common_border_radius);
    background-clip: border-box;
    background-color: white; 
    height: 100%;
    box-shadow: 1px 1px 2px gray;
}
.event_header{
border-top-left-radius: var(--common_border_radius);
border-top-right-radius: var(--common_border_radius);
background-color: green;
}

</style>