<template>
<div class="page">
       <VModal v-model="showForm" :title="'Специальности'">
<VSpecialityForm @close="toggleElement"/>
    </VModal>
    <VPageComponent label="Отделения">
         <template #rbuttons>
            <VButton @click="createSpeciality" rounded >+</VButton>
        </template>
    <VSpecialitiesCatalogue/>
    </VPageComponent>
</div>
</template>
<script setup lang="ts">
import VSpecialitiesCatalogue  from '../../components/catalogues/VSpecialitiesCatalogue.vue'
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import VModal from '../../components/VModal.vue';
import {useSpecialitiesStore} from '../../stores/modules/specialities/useSpecialitiesStore'
import { useToggle } from '../../compositon';
import VSpecialityForm from '../../components/form-components/VSpecialityForm.vue';
const store = useSpecialitiesStore()
const {elementVisible:showForm,toggleElement} = useToggle()

const createSpeciality = ()=>{
store.setSpeciality()
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