<template>
<form @submit.prevent="onSubmit">
<label>
    Название
    <input type="text" v-model="form.title">
</label>
<label>
    С
    <input type="time" v-model="form.start" required>
</label>
<label>
    До
    <input type="time"  v-model="form.end" required>
</label>
<label>
    Цвет
    <input type="color" v-model="form.color" required>
</label>
<div class="actions">
    <VButton type="submit" rounded>Сохранить</VButton>

    <VButton vStyle='cancel' rounded @click.prevent="emit('close')">Отмена</VButton>

</div>
</form>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useSchedullePresetsStore } from '../../stores/modules/schedulle_presets/useSchedullePresetsStore';
import VButton from '../ui-components/VButton.vue';
const emit = defineEmits(['close'])
const onSubmit = ()=>{
console.log(form.value);
if(preset.value){
const {start,end,title,color} = form.value   
preset.value.color = color 
preset.value.title = title
preset.value.start.setHours(+start.split(':')[0],+start.split(':')[1],0,0)
preset.value.end.setHours(+end.split(':')[0],+end.split(':')[1],0,0)

if(preset.value.id){
store.updateSchedullePreset().then(()=>{
    emit('close')
})    
}
else{
store.saveSchedullePreset().then(()=>{
    emit('close')
})

}
}

console.log(preset.value);


emit('close')
}
const form = ref({
title:'',start:'',end:'',color:'#ffddaa'    
})
const store = useSchedullePresetsStore()
const {preset} = storeToRefs(store)
onMounted(()=>{
if (preset.value){
const {start,end,title,color} = preset.value   
form.value = {
title:title?? '',
start:useDateFormat(start,'HH:mm').value,
end:useDateFormat(end,'HH:mm').value,
color
} 
}
})

</script>
<style scoped lang="scss">
@import '../../assets/form.css';
@import '../../assets/inline_input.scss';
label{
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: gray;
}
input[type=time],input[type=color]{
width: 7rem;
}
.actions{
    display: flex;
    gap: 1rem;
}
</style>