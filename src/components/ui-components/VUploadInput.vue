<template>
<input ref="input" type="file" @change="onChange">

<button @click="input?.click()" ></button><label for="button">Выбрать файл</label>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['select'])
const input = ref<HTMLInputElement|null>(null)

const onChange = (e:Event)=>{
    
const target = e.target as HTMLInputElement
const file = target.files && target.files.item(0)
  if(file){    
emit('select',file)
 }
}
</script>
<style scoped lang="scss">
input{
    display: none;
}
button{
background-image: url('../../assets/file-upload.svg');
background-repeat: no-repeat;
background-position: center;
background-color: rgb(18, 164, 255);
border-radius: calc(var(--common_border_radius)/2);
border: 1px solid rgb(18, 164, 255);
width: 28px;
height: 28px;
}
button:hover{
background-color:rgb(200, 234, 255);
transition: all .2s ease-in-out;
}

</style>