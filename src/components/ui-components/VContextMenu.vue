<template>
<transition name="fade">

  <div ref="target" class="context_menu" :style="styles" v-if="value">
    <slot> </slot>
  </div>
</transition>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { computed, ref } from 'vue';

const props = defineProps<{
  pos: { top: number; left: number };
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);
const value = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit('update:modelValue', v);
  },
});
const target = ref<HTMLDivElement | undefined>(undefined);
const styles = computed(()=>{
    return setStyles()
})
   const setStyles = ()=> {
    if(target.value){
        const height = target.value.getBoundingClientRect().height
        const width = target.value.getBoundingClientRect().width
const bottom = props.pos.top + height
const right = props.pos.left + width
const viewportW = window.visualViewport.width
const viewportH = window.visualViewport.height
const st = {
    height:height + 'px',
    width:width + 'px',
    top:bottom > viewportH ? undefined : props.pos.top + 'px',
    bottom:bottom > viewportH ? 0 + 'px': undefined,
    left: right > viewportW ? undefined : props.pos.left + 'px',
    right: right > viewportW ? 0 + 'px' : undefined

  };
  console.log(st);
  
 return st
    }
  return undefined
};
onClickOutside(target, () => {
  value.value = false;
});
</script>
<style scoped lang="scss">
.context_menu {
  position: absolute;

  padding: .3rem;
  box-sizing: border-box;
  border-radius: var(--common_border_radius);
  box-shadow: var(--common_shadows);
  background-color: white;
}
@import '../../assets/show-animation.css';
</style>
