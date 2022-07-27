<template>
<VPageComponent :label="'Детально'">
<template #rbuttons>
    <VButton @click="nomenclatureItem = null" rounded>&times;</VButton>
</template>
    <VNomenclatureForm @close="nomenclatureItem = null"/>
</VPageComponent>
</template>
<script setup lang="ts">
import VNomenclatureForm from '../../components/form-components/VNomenclatureForm.vue';
import {storeToRefs} from 'pinia';
import { useNomenclatureItemsStore } from '../../stores/modules/nomenclature_items/useNomenclatureItemsStore';
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';

const store = useNomenclatureItemsStore()
const {nomenclatureItem} = storeToRefs(store)
</script>
<style scoped lang="scss">
</style>