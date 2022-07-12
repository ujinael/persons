<template>
<input ref="input" type="file" >
<button @click="input?.click()">Загруить инструкцию</button>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const input = ref<HTMLInputElement|null>(null)
</script>
<style scoped lang="scss">
input{
    display: none;
}
button{
background-image: url('../../assets/book.svg');
background-repeat: no-repeat;
background-color: transparent;
padding: .2rem .2rem .2rem 1.5rem;
}
</style>