<template>
    <div class="tab_bar" :class="classes"
    @click="clisk"
    >
        <slot>

        </slot>
    </div>
</template>

<script lang="ts">

export default {
    name: 'VTabBar',
}
</script>
<script lang="ts" setup>
import { computed, onMounted, ref, useSlots } from 'vue';
const props = defineProps<{
direction?:"vertical"|"horizontal"  
align?:"start"|"end" 
modelValue?:'prev'|'next'
activeView?:string
}>()

const emit = defineEmits(['update:modelValue'])
const value = computed<'prev'|'next'|undefined>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
const classes = computed(()=>
  {
return {
vertical:props.direction == 'vertical',
horizontal:props.direction == 'horizontal'|| props.direction == undefined,
start:props.align == 'start',
end:props.align == 'end'
}
})
const tabs = ref<Array<string>>([])
const slots = useSlots()
onMounted(()=>{
//     if(slots && slots.default){
//         const slots$:Array<any> = slots.default('')
//   tabs.value =  slots$.map(s=>{
// return s.props.value ?? ''   
//    })
//       prevView.value =  props.activeView

//    }
    
})
const prevView = ref<string|undefined>('')
const clisk = ()=>{

    if(tabs.value.findIndex(v=>v===prevView.value) <= tabs.value.findIndex(v=>v===props.activeView))
    value.value = 'next'
    else value.value = 'prev'
    prevView.value = props.activeView
}
</script>

<style lang="scss" scoped>
.tab_bar{
    display: grid;
    gap:.4rem;
    cursor:default;
}
.start{
    justify-content: flex-start;

}
.end{
    justify-content: flex-end;
}
.vertical{
grid-auto-flow: row;
// grid-template-rows: repeat(auto-fill,min-content);    
}
.horizontal{
grid-auto-flow: column;
// grid-auto-columns: auto;
// grid-template-rows: auto;
// grid-template-columns: repeat(7,1fr);    

}
</style>