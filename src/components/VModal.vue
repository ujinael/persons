<template>
<transition name="fade">
<div class="v-modal" v-if="value">
    <div class="wrapper">
        <div class="content">
            <div class="header">
<h2 class="title">{{title}}</h2>
<div class="close_btn" @click="value = !value">
&times;
  <!-- <CloseIco class="close_ico"/>   -->
</div>
            </div>
            <div class="body">
                  <slot>

            </slot>
            </div>
          
        </div>
    </div>
</div>
</transition>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import CloseIco from '../assets/close.svg'
const props = defineProps<{
title?:string
modelValue:boolean
}>()
const emit = defineEmits(['update:modelValue'])
const value = computed<boolean>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
</script>
<style scoped lang="scss">
@import '../assets/show-animation.css';
.v-modal{
    position: absolute;
    top:0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.391);
    z-index: var(--z_index-modal);
    display: flex;
    flex-direction: column;
    justify-content: center;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
}
.wrapper{
display: flex;
justify-content: center;

}
.content{
    background-color: whitesmoke;
   box-sizing: border-box;
   padding: 1rem;
   border-radius: .4rem; 
}
.header{
    display: grid;
    grid-template-columns: 1fr 80% 1fr;
    justify-content: space-between;
}
.title{
    grid-area: 1/2/2/3;
}
.close_btn{
    color: gray;
justify-self: flex-end;
    grid-area: 1/3/2/4;
    font-size: xx-large;
    line-height: 1rem;
    height: 1rem;
    width: auto;
    border-radius: .5rem;
    cursor: pointer;
}
.close_btn:hover{
     filter: drop-shadow(.1rem .1rem .2rem gray);
  transition: all .2s ease-in;
}
.close_btn:active{
     transform: scale(1.5);
  transition: all .2s ease-in;
}


// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s ease;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }
</style>