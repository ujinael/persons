<template>
<div class="page">
        <VModal v-model="positionForm" :title="'Должность'">
<VPositionForm @close="togglePositionForm"/>
    </VModal>
    <VModal v-model="showForm" :title="'Отделение'">
<VDepartmentForm @close="toggleElement"/>
    </VModal>
    <VPageComponent label="Отделения">
        <template #buttons>
            <VButton @click="createDepartment" rounded >+</VButton>
        </template>
            <VDepartmentsCatalogue/>
    </VPageComponent>
    <transition name="fade">
        <VPageComponent v-if="store.department" label="Должности">
        <template #buttons>
            <VButton @click="createDepartment" rounded >+</VButton>
        </template>
            <VPositionsCatalogue/>
    </VPageComponent> 
       </transition>
</div>
</template>
<script setup lang="ts">
import VDepartmentsCatalogue from '../../components/catalogues/VDepartmentsCatalogue.vue';
import VPositionsCatalogue from '../../components/catalogues/VPositionsCatalogue.vue';

import VPositionForm from '../../components/form-components/VPositionForm.vue'

import VDepartmentForm from '../../components/form-components/VDepartmentForm.vue'
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import VModal from '../../components/VModal.vue';
import { useToggle } from '../../compositon';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
import { storeToRefs } from 'pinia';

const store = useDepartmentsStore()
const positionsStore = usePositionsStore()
// const {department} = storeToRefs(store) 
const {showForm,toggleForm} = storeToRefs(positionsStore)
const {elementVisible:positionForm,toggleElement:togglePositionForm} = useToggle()

const createDepartment = ()=>{
store.setDepartment()

}
const createPosition = ()=>{
positionsStore.setPosition()
toggleForm()
}
</script>
<style scoped lang="scss">
.page{
    padding: .8rem;
    display: grid;
    grid-template-columns:repeat(2,1fr) ;
    gap: 1rem;
}
@import '../../assets/show-animation.css'
</style>