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
const emit = defineEmits(['close'])
const store = useDepartmentsStore()
const  {department} = storeToRefs(store)
const onSave = ()=>{
    if(department.value)
    {
    if(department.value.id){        
    }
    else{
        store.saveDepartment().then(()=>{
            emit('close')
        })
    }
    }
}
</script>
<style scoped lang="scss">
@import '../../assets/form.css'
</style>