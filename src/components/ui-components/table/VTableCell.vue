<template>
<td  @dblclick="startEdit" :class="{editable}">
   <slot v-if="edit && editable" name="editable">
<input @input="debouncedFn" v-focus v-model="editedText"
@blur="stopEdit"
>
    </slot> 
    <slot v-else>
<span :class="{editable_value:editable}">{{value}}</span>
    </slot>
   
    <transition name="fade">
    <div v-if="edit && editable" class="dropdown">
      <slot name="dropdown">  
<ul v-if="options && options.length">
    <li @click="onSelect(item)" v-for="(item, index) in options" :key="index">
    {{item.title}}
    </li>
</ul>

     </slot>
        </div>
        </transition>
</td>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core'
import { Option } from '../../../stores/models';

const debouncedFn = useDebounceFn(() => {
  emit('load',editedText.value)
}, 700)
const props = defineProps<{
 editable?:boolean 
  value?:any
 options?:Option[]
}>()

const emit = defineEmits(
    ['update:modelValue','startEdit','stopEdit','input','load','select']
    )
const editedText = ref('')
const edit = ref(false)
const startEdit = ()=>{
    if(props.editable){
emit('startEdit')
edit.value = true
editedText.value= props.value
debouncedFn()
    }
}
const stopEdit = ()=>{
   edit.value = false
    emit('stopEdit',editedText.value)  
}

const onSelect = (option:Option)=>{
emit('select',option)
stopEdit()
}
</script>
<style scoped lang="scss">
td{
   position: relative;
   height: 2.2rem;
}
.dropdown{
   position: absolute;
   top:100%;
   left:0px;
   width: 100%;
   max-height: 7rem;
   height: min-content;
   border-radius: var(--common_border_radius);
   background-color: rgb(40, 39, 39,0.8);
   backdrop-filter: blur(4px);
   z-index: var(--z_index-dropdown);
   overflow-y: scroll;
   color: white;
   font-family:'Times New Roman', Times, serif;
}
.editable:hover{
    cursor: pointer;
}
.editable_value{
// transition: all .2s ease;
    color: green;
    border-bottom: 1px solid green;
}
input{
    width: 100%;
    height: 100%;
    text-align: center;
    // border:none;
    border: 1px solid gray;
    box-sizing: border-box;
    background-clip: border-box;
    font-family: inherit;
    font-size: inherit;
}
input:focus{
border-color:lightblue ;
outline: none;
transition: border-color .2s ease-in;
}
input:hover{
border-color:lightblue ;
transition: border-color .2s ease-in;

}
li{
padding: .2rem;

}
li:hover{
background-color: rgb(40, 39, 39,0.4);

}
@import '../../../assets/table.css';
// @import '../../../assets/inline_input.scss';
@import '../../../assets/show-animation.css';
</style>