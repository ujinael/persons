<template>
<div class="page">
    <VModal v-model="elementVisible" :title="'Новый месяц'">
    <VMonthSchedulleForm @close="toggleElement"/>
    </VModal>
    <VPageComponent label="Расписания">
        <template #rbuttons>
<VButton icon="add" rounded @click="creatNewMonthSchedulle"/>
        </template>
<ul>
    <li v-for="(item, index) in monthSchedulles" 
    :key="index"
    class='catalog_item'>
    <span>Расписание {{`${item.month} - ${item.year}г`}}</span>
    <div class="actions">
        <VButton vStyle="accept" icon='edit' rounded @click="onEdit(item.id)"/>
         <VButton vStyle="delete" icon='delete' rounded/>
    </div>
    </li>
</ul>

    </VPageComponent>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useMonthSchedullesStore } from '../../stores/modules/month_schedulles/useMonthSchedullesStore.js';
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import { useRouter } from 'vue-router';
import { useToggle } from '../../composition/useToggle.js';
import VModal from '../../components/VModal.vue';
import VMonthSchedulleForm from '../../components/form-components/VMonthSchedulleForm.vue';
const store = useMonthSchedullesStore()
const {monthSchedulles} = storeToRefs(store)
onMounted(()=>{
    store.fetchMonthSchedulles()
})
const {elementVisible, toggleElement} = useToggle()
const creatNewMonthSchedulle = ()=>{
    store.setMonthSchedulle()
    toggleElement()
}
const router = useRouter()
const onEdit = (id?:string)=>{
if(id){
    router.push(`/timetable/${id}`)
}
}
</script>
<style scoped lang="scss" >
@import '../../assets/catalogues.scss';
.catalog_item{
    display: flex;
    justify-content: space-between;
}
.actions{
    display: flex;
    gap:.5rem;
}
</style>