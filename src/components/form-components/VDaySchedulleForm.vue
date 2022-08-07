<template>
<form @submit.prevent="onSubmit">
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
import { onMounted, ref } from 'vue';
import { DaySchedulle, Status } from '../../stores/models';
import VButton from '../ui-components/VButton.vue';
const props = defineProps<{
item:DaySchedulle
}>()
const emit = defineEmits(['close'])
const onSubmit = ()=>{
const {start,end,color} = form.value   
props.item.color = color 
props.item.start = new Date(props.item.start.setHours(+start.split(':')[0],+start.split(':')[1],0,0))
props.item.end = new Date( props.item.end.setHours(+end.split(':')[0],+end.split(':')[1],0,0))
props.item.status = Status.ACTIVE

emit('close')

}


const form = ref({
start:'',end:'',color:'#ffddaa'    
})

onMounted(()=>{
const {start,end,color} = props.item   
form.value = {
start:useDateFormat(start,'HH:mm').value,
end:useDateFormat(end,'HH:mm').value,
color:color ?? '#ffffff'
} 
}
)

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