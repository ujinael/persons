<template>
<div class="select" ref="target" tabindex="0"
 @click="showDropdown">
<div class="select_value">
  <div class="select_label" v-if="value">
  <span v-if="label">
    {{label}}
  </span>
  <span v-else>
    {{typeof value === 'string'?value:`${value.title}`}}
  </span>
  </div>
  <div class="select_label" v-else>
    выбрать
  </div>
<div class="icon_container">
<ArrowIco class="ico" :class="{open:dropdownVisible}"/>
</div>
</div>
<transition name="fade">
   <div class="dropdown" v-if="dropdownVisible">
  <ul>
    <li v-for="option in options" @click="select(option)">
    {{typeof option === 'string'?option:option.title }}
    </li>
</ul>  
</div>
</transition>
 
</div>


</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToggle } from '../../composition';
import ArrowIco from '../../assets/right-arrow-svgrepo-com.svg'
import { onClickOutside } from '@vueuse/core'
const target = ref<HTMLDivElement|undefined>(undefined)
interface Option{
  id?:string
  title:string
}
onClickOutside(target,()=>{
  dropdownVisible.value = false
})
const props = defineProps<{
modelValue:Option|string|undefined|null,
options:string[]|Array<Option>
label?:string
}>()
const select = (option:Option|string)=>{  
value.value = option
emit('select',option)
}
const emit = defineEmits(['update:modelValue','select'])
const value = computed<string|Option|undefined|null>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
const {elementVisible:dropdownVisible,toggleElement} = useToggle()
const showDropdown = ()=>{
toggleElement()
}
// const onBlur=()=>{
//   if(dropdownVisible)toggleElement()
// }
</script>
<style scoped lang="scss">
@import '../../assets/show-animation.css';
.select{
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  background-clip: padding-box;
border-radius:calc( var(--common_border_radius)/2);
height: var(--common_input_height);
border:var(--common_input_border);
font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
width: 15rem;  
display: flex;
flex-direction: column;
justify-content: center;
}
.backdrop{
  position: absolute;
  top:0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  // background-color: gray;
}
.select:focus{
  outline: none;
  border:var(--common_input_hovered_border);
transition: all .1s ease-in-out;
}
.select_value{
height: var(--common_input_height);
// background-color: aliceblue;
display: flex;
justify-content: space-between;
}
.select_label{
  padding:0 .2rem;
display: flex;
flex-direction: column;
justify-content: center;
cursor: default;
}
.icon_container{
  height: var(--common_input_height);
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: .2rem;
  box-sizing: border-box;
}
.ico{
  height: 1rem;
transform: rotate(90deg);
transition: transform .2s ease-in-out;

}
.ico.open{
transform: rotate(270deg);
transition: transform .2s ease-in-out;
}
.dropdown{
  // position: fixed;
    position: absolute;

  // top:calc(var(--common_input_height) - 2px);
  top:100%;
  left:0px;
  width: 100%;
  z-index: var(--z_index-dropdown);
  background-color: rgb(0, 0, 0,.7);
  height: fit-content;
  overflow-y: auto;
 max-height: calc(var(--common_input_height)*6);
border-bottom-left-radius:calc(var(--common_border_radius)/2);
border-bottom-right-radius:calc(var(--common_border_radius)/2);
backdrop-filter: blur(4px);
}
ul{
  list-style: none;
  color: whitesmoke;
}
li{
  box-sizing: border-box;
  height: var(--common_input_height);
  border-bottom: 1px solid whitesmoke;
  display: flex;
flex-direction: column;
justify-content: center;
}
li:hover{
  cursor:default;
  background-color: rgb(0, 0, 0,.5);;
}
</style>