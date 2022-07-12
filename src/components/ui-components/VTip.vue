<template>
<div class="tip" :class="classes">
 <span>
    {{title}}
    <CloseIco @click="emit('onDeleteClick')" v-if="remove" class="ico"/>
 </span>   
</div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import CloseIco from '../../assets/close.svg'
const props = defineProps<{
title:string
remove?:boolean
type?:'default'|'add'
}>()
const emit = defineEmits(['onDeleteClick'])
const classes = computed(()=>{
  return {
    add:props.type === 'add',
    default:!props.type || props.type === 'default' 
  }
})
</script>
<style scoped lang="scss">
span{
    display: flex;
    gap: .2rem;
}
.tip{
  box-sizing: border-box;
font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-size: 14px;
background-color: white;
box-shadow: .1rem .1rem .2rem lightgray;
border-radius: var(--common_border_radius);
padding: .2rem .6rem;
display: inline;
align-self: center;
justify-self: left;

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
    cursor: pointer;
}
.add:nth-child(1){
    stroke:1px whitesmoke;
    fill: whitesmoke;
}
.add:hover{
    background-color: var(--accept_invert_color);
    color: var(--accept_color);
}
</style>