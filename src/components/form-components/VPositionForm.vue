<template>
<form @submit.prevent="onSave" v-if="department">
 <label>Название:
    <VInput v-model="department.title" placeholder="введите название" required/>
 </label>   
 <label>Описание:
    <VInput v-model="department.description" placeholder="введите описание" required/>
    </label>   
    <div class="actions">
        <VButton :v-style="'accept'" type="submit" rounded>Сохранить</VButton>
        <VButton :v-style="'cancel'" type="button" @click.stop="emit('close')" rounded>Отмена</VButton>

    </div>
</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';
import VInput from '../ui-components/VInput.vue';
import VButton from '../ui-components/VButton.vue';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
const emit = defineEmits(['close'])
const store = usePositionsStore()
const  {position} = storeToRefs(store)
const onSave = ()=>{
    if(position.value)
    {
    if(position.value.id){        
    }
    else{
        store.savePosition().then(()=>{
            emit('close')
        })
    }
    }
}
</script>
<style scoped lang="scss">
@import '../../assets/form.css';
</style>