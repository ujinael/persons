<template>
<form @submit.prevent="onSave" v-if="position">
 <label>Название:
    <VInput v-model="position.title" placeholder="введите название" required/>
 </label>   
 <label>Описание:
    <VInput v-model="position.description" placeholder="введите описание" required/>
    </label>   
    <div class="actions">
        <VButton :v-style="'accept'" type="submit" rounded>Сохранить</VButton>
        <VButton :v-style="'cancel'" type="button" @click.stop="emit('close')" rounded>Отмена</VButton>

    </div>
</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import VInput from '../ui-components/VInput.vue';
import VButton from '../ui-components/VButton.vue';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';
const emit = defineEmits(['close'])
const store = usePositionsStore()
const departmentStore = useDepartmentsStore()
const  {position} = storeToRefs(store)
const onSave = ()=>{
    if(position.value)
    {
    if(position.value.id){        
    }
    else{
    
        store.savePosition(departmentStore.department?.id!).then(p=>{
          departmentStore.department?.positions?.unshift(p)
          emit('close')
        })
    }
    }
}
</script>
<style scoped lang="scss">
@import '../../assets/form.css';
</style>