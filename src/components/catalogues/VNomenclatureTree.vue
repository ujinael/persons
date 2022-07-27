<template>
<div>
    <!-- <VModal title="Номенклатурная единица" v-model="form">
<VNomenclatureForm @close="toggleElement"/>
    </VModal>    -->
     
     <ul> 
  
     <VDataTreeItem v-if="item"
   :node="item"
   @save-category="store.saveCategory"
   @select-node="store.setCategory"
   @select-item="selectItem"
    @lazy-load="loadChildren"
    />    
    </ul>
   
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useNomenclatureItemsStore } from '../../stores/modules/nomenclature_items/useNomenclatureItemsStore';
import VDataTreeItem from '../ui-components/VDataTree.vue/VDataTreeItem.vue';
import VModal from '../VModal.vue';
import VNomenclatureForm from '../form-components/VNomenclatureForm.vue';
import { useToggle } from '../../compositon';
import { Data, DataTree, NomenclatureItem } from '../../stores/models';


const store = useNomenclatureItemsStore()
const {nomenclatureTree:item } = storeToRefs(store)
const {elementVisible:form,toggleElement} = useToggle()

onMounted(()=>{
  store.fetchRootCategory()
})
const selectItem = (item:NomenclatureItem)=>{    
    store.setNomenclatureItem(item)
}
const loadChildren = (node:DataTree<Data>)=>{    
        if(node.name !== 'номенклатура')
    store.fetchCategory(node.id!).then(n=>{
        node.children = n.children
        node.items = n.items
    })
}

const createItem = (id:string)=>{
store.setNomenclatureItem(undefined,id)
toggleElement()
}
</script>
<style scoped lang="scss">
ul{
    text-align: left;
    list-style-type: none;
}
</style>