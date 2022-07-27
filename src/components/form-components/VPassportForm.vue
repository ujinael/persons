<template>
<form @submit.prevent="savePassport" v-if="passport">
 <label for="#type">тип документа:
 <VSelect id="type" v-model="passport.type"
 :options="types.map(t=>({title:t.title,value:t}))"
 :label="passport.type?.title"
 /></label>   
 <label for="#seria">серия:
 <VInput id="seria" v-model="passport.seria"/>
</label>
 <label for="#number">номер:
 <VInput id="number" v-model="passport.number"/>
</label>
 <label for="#code">код подразделения:
 <VInput id="code" v-model="passport.code"/>
</label>
 <label for="#department">кем выдан:
 <VInput id="department" v-model="passport.department"/>
</label>
 <label for="#date_of_issue">дата выдачи:
 <VInput type="date" id="date_of_issue" v-model="passport.dateOfIssue"/>
</label>
 <label for="#expiration_date">дата окончания:
 <VInput type="date" id="expiration_date" v-model="passport.expirationDate"/>
</label>
 <label for="#born_place">место рождения:
 <VInput id="born_place" v-model="passport.bornPlace"/>
 </label>
 <div class="actions">
    <VButton type="submit" rounded>Сохранить</VButton>
    <VButton @click="emit('close')" plain :vStyle="'cancel'" rounded>Отмена</VButton>
 </div>
</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { usePassportsStore } from '../../stores/modules/passports/usePassportsStore';
import VSelect from '../ui-components/VSelect.vue';
import VInput from '../ui-components/VInput.vue';
import VButton from '../ui-components/VButton.vue';
import { usePersonsStore } from '../../stores/modules';
// const props = defineProps<{
//     personID:string
// }>()

const emit = defineEmits(['close'])
const store = usePassportsStore()
const  {passport,types} = storeToRefs(store)

const personStore = usePersonsStore()
const {person} = storeToRefs(personStore)
const savePassport = ()=>{
if(passport.value){
if(passport.value.id) {

}   
else {
    if(person.value?.id)
store.savePassport(person.value.id)
.then(()=>{
    emit('close')
})    
}
}
}
onMounted(()=>{
store.fetchTypes() 
})
</script>
<style scoped lang="scss">
@import '../../assets/form.css';
form{
    width: 550px;
    grid-template-columns: repeat(2,1fr);
}
.actions{
    display: flex;
    grid-column: 1/3;
}

</style>