<template>
    <div class="tab" :class="{active:isActive(value ?? '')}" @click="tabClick(value ?? '')">
   <slot>
     {{title}}
   </slot>
  
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
    name: 'VTabBarItem',
}
</script>

<script lang="ts" setup>

const props = defineProps<{
value?:string|number,
modelValue?:string|number,
title?:string   
}>()
const emit = defineEmits(['update:modelValue','onTabClick','clickBeforeActivated'])
const activeTab = computed({get(){return props.modelValue}
,set(v){emit('update:modelValue',v)}})
const isActive = (tab:string|number)=>{return tab === activeTab.value}
const tabClick = (tab:string|number)=>{
    emit('clickBeforeActivated')
    if(activeTab.value != tab){
            activeTab.value = tab
            emit('onTabClick')
        }  }

</script>
<style lang="scss" scoped>
.tab{
    box-sizing: border-box;
   
}
.tab:hover{
    cursor: pointer;
}

</style>