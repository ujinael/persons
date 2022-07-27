<template>
<form @submit.prevent="onSave">
    <label>Фамилия
        <VInput v-model="person!.surname" type="text"/>
    </label>
     <label>Имя
        <VInput v-model="person!.name" type="text"/>
    </label>
     <label>Отчество
        <VInput v-model="person!.patronymic" type="text"/>
    </label>
     <label >Пол
    <VSelect v-model="person!.gender" :options="['male','female']" :label="`&male;${person?.gender}`"/>
    </label>
     <label>
        Дата рождения
        <VInput type="date" v-model="person!.pickDate"/>
    </label>
    <VButton rounded :vStyle="'accept'" type="submit">Сохранить</VButton>
</form>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import VInput from '../ui-components/VInput.vue'
import VButton from '../ui-components/VButton.vue';
import VSelect from '../ui-components/VSelect.vue';
import { usePersonsStore } from '../../stores/modules';
import { storeToRefs } from 'pinia';
const props = defineProps<{
modelValue:boolean
}>()
const emit = defineEmits(['update:modelValue','update:personValue','save'])
const value = computed<boolean>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
const store = usePersonsStore()
const {person} = storeToRefs(store)
const onSave = ()=>{
if(person.value && person.value.id){
    store.updatePerson().then(()=>{
        value.value = false
    })

}
else{
    store.savePerson().then(()=>{
        value.value = false
    })
}
}

</script>
<style scoped lang="scss">
@import '../../assets/form.css';

form{
    width: 450px;
    justify-items: right;
}
label{
    display: flex;
    gap:1rem;
}

</style>