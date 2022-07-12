<template>
<div class="page">
    <VModal v-model="showForm" :title="'Отделение'">
<VDepartmentForm @close="toggleElement"/>
    </VModal>
    <VPageComponent label="Отделения">
        <template #buttons>
            <VButton @click="createDepartment" rounded >+</VButton>
        </template>
            <VDepartmentsCatalogue/>
    </VPageComponent>
        <VPageComponent label="Должности">
        <template #buttons>
            <VButton @click="createDepartment" rounded >+</VButton>
        </template>
            <VPositionsCatalogue/>
    </VPageComponent>
</div>
</template>
<script setup lang="ts">
import VDepartmentsCatalogue from '../../components/catalogues/VDepartmentsCatalogue.vue';
import VPositionsCatalogue from '../../components/catalogues/VPositionsCatalogue.vue';

import VDepartmentForm from '../../components/form-components/VDepartmentForm.vue'
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import VModal from '../../components/VModal.vue';
import { useToggle } from '../../compositon';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';

const store = useDepartmentsStore()
// const {department} = storeToRefs(store) 
const {elementVisible:showForm,toggleElement} = useToggle()
const createDepartment = ()=>{
store.setDepartment()
toggleElement()
}
</script>
<style scoped lang="scss">
.page{
    padding: .8rem;
    display: grid;
    grid-template-columns:repeat(2,1fr) ;
    gap: 1rem;
}
</style>