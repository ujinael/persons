<template>
<div class="tab_component">
    <div class="positions">
                <h4>Должности</h4>

    <ul>
   <VTip v-if="employer.positions.length" 
   v-for="item in employer.positions"
   :key="item.id"
   :title="`${item.departmentTitle}/${item.title}`"
   remove
   @on-delete-click="store.deletePosition(item.id?? '')"
   />
   <VTip  
   title="добавить"
   @click="toggleElement"
   type="add"
   v-model="elementVisible"
   >
   <template #dropdown>
    <VPositionSetForm @select="selectPosition"/>
   </template>
   </VTip>
    </ul>
     </div>
     <div class="specialities">
        <h4>Специальности</h4>
<ul>
   <VTip v-if="employer.specialities.length" 
   v-for="item in employer.specialities"
      :key="item.id"
   :title="item.title"
   remove
   @on-delete-click="store.deleteSpeciality(item.id?? '')"
   />
   <VTip  
   title="добавить"
   @click="toggleSpecialities"
   type="add"
   v-model="specialities"
   >
   <template #dropdown>
    <VSpecialitySetForm @select="selectSpeciality"/>
   </template>
   </VTip>
    </ul>
     </div>
</div>
</template>
<script setup lang="ts">
import { useEmployersStore } from '../../../../stores/modules';
import VTip from '../../../../components/ui-components/VTip.vue';
import { storeToRefs } from 'pinia';
import { useToggle } from '../../../../composition';
import VPositionSetForm from '../../../../components/form-components/VPositionSetForm.vue';
import VSpecialitySetForm from '../../../../components/form-components/VSpecialitySetForm.vue';

const store = useEmployersStore()
const {employer} = storeToRefs(store)
const {elementVisible,toggleElement} = useToggle()
const selectPosition = (id:string)=>{
    store.setPosition(id).then(()=>{
toggleElement()
    })
}
const {elementVisible:specialities,toggleElement:toggleSpecialities} = useToggle()
const selectSpeciality = (id:string)=>{
    store.setSpeciality(id).then(()=>{
toggleSpecialities()
    })
}
</script>
<style scoped lang="scss">
.tab_component{
    display: grid;
    gap: 1rem;

}
h4{
    text-align: left;
    margin-bottom: .5rem;
}


ul{
    display: grid;
    grid-auto-flow: column;
    justify-content: left;
    gap:.5rem;
}
</style>