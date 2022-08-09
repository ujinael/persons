<template>
<div class="tip" ref="target">
 <span 
  @click="emit('click',$event)"
  :class="classes">
    {{title}}
    <CloseIco @click="emit('onDeleteClick')" v-if="remove" class="ico"/>
 </span>   
 <transition name="fade">
 <div class="dropdown" ref="dropdown" v-show="value">
 <div class="content">
    <slot name="dropdown"
  ></slot>
 </div>

 </div>
 </transition>
</div>
</template>
<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import CloseIco from '../../assets/close.svg'
const props = defineProps<{
title:string
remove?:boolean
type?:'default'|'add'
modelValue?:boolean
}>()

const value = computed<boolean|undefined>({
get(){
  
if(props.modelValue)showDropdown()
  return props.modelValue},
set(v){emit('update:modelValue',v)}
})
const emit = defineEmits(['onDeleteClick','update:modelValue','click'])
const classes = computed(()=>{
  return {
    add:props.type === 'add',
    default:!props.type || props.type === 'default' 
  }
})
const target = ref<HTMLDivElement|undefined>(undefined)
const dropdown = ref<HTMLDivElement>()
const showDropdown = ()=>{
if(!target.value) return
if(!dropdown.value) return
const rect = target.value.getBoundingClientRect()
dropdown.value.style.top = rect.bottom + 'px'
dropdown.value.style.left = rect.left + 'px'
}
</script>
<style scoped lang="scss">
span{
    display: flex;
    gap: .2rem;
}
span:hover{
cursor: pointer;
}
.tip{
box-sizing: border-box;
font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-size: small;
background-color: white;
box-shadow: .1rem .1rem .2rem lightgray;
border-radius: var(--common_border_radius);
display: flex;
align-self: center;
justify-self: left;
// position: relative;

}
span{
  padding: .2rem .6rem;
border-radius: inherit;
pointer-events: auto;
}
.ico{
  width: 12px;
  height: auto;  
  fill-rule:nonzero;
  fill:currentColor;
  color: currentColor;
}
.ico:hover{
    cursor: pointer;
      stroke:2px rgb(241, 26, 26);

transition: all .2s ease-in;
filter: drop-shadow(.2rem .2rem .4rem gray)
brightness(60%)
 grayscale(80%)
 
// filter: saturate(0%);
}

.add{
    background-color: var(--accept_color);
    border-color: var(--accept_color);
    color: whitesmoke;
}
.add:nth-child(1){
    stroke:1px whitesmoke;
    fill: whitesmoke;
}
.add:hover{
    background-color: var(--accept_invert_color);
    color: var(--accept_color);
}
.dropdown{
  position: absolute;
  // top: 1.3rem;
  // left: 0;
  border-radius: var(--common_border_radius);
  // min-height: 100%;
  width: fit-content;
  // min-width: 100%;
  border: 1px solid lightgray;
  background-color: white;
}
@import '../../assets/show-animation.css';
</style>