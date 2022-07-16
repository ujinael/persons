<template>
<div>
    <ul>
   <VTip v-if="employer.positions.length" 
   v-for="item in employer.positions"
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
</template>
<script setup lang="ts">
import { useEmployersStore } from '../../../../stores/modules';
import VTip from '../../../../components/ui-components/VTip.vue';
import { storeToRefs } from 'pinia';
import { useToggle } from '../../../../compositon';
import VPositionSetForm from '../../../../components/form-components/VPositionSetForm.vue';
const store = useEmployersStore()
const {employer} = storeToRefs(store)
const {elementVisible,toggleElement} = useToggle()
const selectPosition = (id:string)=>{
    store.setPosition(id).then(()=>{
toggleElement()
    })
}
</script>
<style scoped lang="scss">
.tip{
    // background-color: gray;
}
ul{
    display: grid;
    grid-auto-flow: column;
    justify-content: left;
    gap:.5rem;
}
</style>