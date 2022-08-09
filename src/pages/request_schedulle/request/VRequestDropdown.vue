<template>
<transition name="fade">
 <div class="dropdown"  ref="dropdown" v-if="value" :style="{...pos}">
<slot>

</slot>
    </div>
</transition>
  
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { computed, ref } from 'vue';
const props = defineProps<{
    modelValue:boolean

}>()
const dropdown = ref<HTMLDivElement>()
const pos = ref<
{
top?:string,
left?:string,
width?:string,
right?:string
}
>({top:'0px',left:'0px',width:'0px'})
defineExpose({
    pos
})
onClickOutside(dropdown,()=>{
    if(value.value)
    value.value = false
})
const emit = defineEmits(['update:modelValue'])
const value = computed<boolean>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
</script>
<style scoped lang="scss">
.dropdown{
    position: absolute;
    box-sizing: border-box;
    padding: .5rem;
    height: 400px;
    // width: 300px;
    border-radius: var(--common_border_radius);
    box-shadow: var(--common_shadows);
    z-index: 2000;
    background: rgba(232, 232, 232, 0.1);
    backdrop-filter: blur(8px);
}
@import '../../../assets/show-animation.css';
</style>