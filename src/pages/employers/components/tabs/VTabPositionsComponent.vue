<template>
<div>
    <VModal v-model="elementVisible" title="Должности">
<VPositionSetForm/>
    </VModal>
    <ul>
   <VTip v-if="employer.positions.length" 
   v-for="item in employer.positions"
   :title="item.title"
   remove
   />
   <VTip  
   title="добавить"
   @click="toggleElement"
   type="add"
   />

    </ul>
</div>
</template>
<script setup lang="ts">
import { useEmployersStore } from '../../../../stores/modules';
import VTip from '../../../../components/ui-components/VTip.vue';
import { storeToRefs } from 'pinia';
import VModal from '../../../../components/VModal.vue';
import { useToggle } from '../../../../compositon';
import VPositionSetForm from '../../../../components/form-components/VPositionSetForm.vue';

const store = useEmployersStore()
const {employer} = storeToRefs(store)
const {elementVisible,toggleElement} = useToggle()
</script>
<style scoped lang="scss">
.tip{
    // background-color: gray;
}
ul{
    display: grid;
}
</style>