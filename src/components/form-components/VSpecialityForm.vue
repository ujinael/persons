<template>
<form @submit.prevent="onSave" v-if="speciality">
 <label>Название:
    <VInput v-model="speciality.title" placeholder="введите название" required/>
 </label>   
 <label>Описание:
    <VInput v-model="speciality.description" placeholder="введите описание" required/>
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
import { useSpecialitiesStore } from '../../stores/modules/specialities/useSpecialitiesStore';
const emit = defineEmits(['close'])
const store = useSpecialitiesStore()
const  {speciality} = storeToRefs(store)
const onSave = ()=>{
    if(speciality.value)
    {
    if(speciality.value.id){        
    }
    else{
    
        store.saveSpeciality().then(p=>{
          emit('close')
        })
    }
    }
}
</script>
<style scoped lang="scss">
@import '../../assets/form.css';
</style>