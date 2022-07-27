<template>
<VPageComponent label="Номенклатура">
      <template #lbuttons>
<VTabBar>
    <VTabBarItem value="tree" v-model="selectedView"><VButton rounded>&bot;</VButton></VTabBarItem>
    <VTabBarItem value="list" v-model="selectedView"><VButton rounded>&doteqdot;</VButton></VTabBarItem>
</VTabBar>
</template>
    <template #rbuttons>
        <VButton @click="createItem"  rounded > &boxbox;</VButton>
        <VButton v-if="selectedView==='tree' && category" @click="createCategory"  rounded > <img src="../../assets/folder-add.svg"></VButton>

    </template>
    <component :is="views[selectedView]"></component>
</VPageComponent>
</template>
<script setup lang="ts">
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import VNomenclatureList from '../../components/catalogues/VNomenclatureList.vue';
import VNomenclatureTree from '../../components/catalogues/VNomenclatureTree.vue';

import { useToggle } from '../../compositon';
import VModal from '../../components/VModal.vue';
import VNomenclatureForm from '../../components/form-components/VNomenclatureForm.vue';
import { useNomenclatureItemsStore } from '../../stores/modules/nomenclature_items/useNomenclatureItemsStore';
import VTabBar from '../../components/ui-components/VTabBar.vue';
import VTabBarItem from '../../components/ui-components/VTabBarItem.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
const {elementVisible:form,toggleElement} = useToggle()
const selectedView = ref<keyof typeof views>('tree')
const views = {
list:VNomenclatureList,
tree:VNomenclatureTree
}
const store = useNomenclatureItemsStore()
const {category} = storeToRefs(store)
const createItem = ()=>{
store.setNomenclatureItem()
// toggleElement()
}
const createCategory = ()=>{
    store.addCategory()
}
</script>
<style scoped lang="scss">
.page_component{
    // height: 100%;
}
</style>