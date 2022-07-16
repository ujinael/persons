<template>
<input v-model="value" >

</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
modelValue?:string
}>()
const emit = defineEmits(['update:modelValue'])
const value = computed<string|undefined>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
</script>
<style scoped lang="scss">
input{
    box-sizing: border-box;
background-color: transparent;
border-radius:calc( var(--common_border_radius)/2);
padding: var(--common_input_h_padding) var(--common_input_v_padding);
height: var(--common_input_height);
border:var(--common_input_border);
font-size: var(--common_input_fontsize);
line-height: var(--common_input_lineheight);
font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
width: 15rem;   
}
input:focus{
outline:none;
border:var(--common_input_hovered_border);
transition: all .1s ease-in-out;

}

</style>