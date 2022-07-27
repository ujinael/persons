<template>
<div class="page">
   <VPageComponent label="Прайс">
      <section v-if="price">
   <label for="title">Название
       <input id="title" v-model="price.title" placeholder="Название">
</label>
 <label for="status"> Статус: 
   <VSelect id="status" v-model="price.status" 
:label="price.status" 
:options="[Status.ACTIVE,Status.CREATED,Status.DEPRICATED]"
/></label>
   <div class="save_price">
      <VButton vStyle='accept' rounded @click="store.updatePrice()"> Сохранить</VButton>

   </div>
      </section>
   </VPageComponent>
<div class="page_component">
 
  <table>
 <thead>
    <th>№</th>
    <VTableHeaderCell sortable v-model="sortDirection">
      Номенклатура
    </VTableHeaderCell>
    <th>Специализация</th>
    <th>цена/руб</th>
    <th
>цена/коп</th>
    <VTableHeaderCell width="150px">
      <VButton @click="store.createNewPriceItem()" icon='add' rounded></VButton>
    </VTableHeaderCell>
 </thead>   
 <tbody>
   <TransitionGroup name="fade">
   <tr v-for="(item, index) in store.sortedPriceItems" :key="index"
   :class="{edit_mode:item.edit}"
   >
      <td>{{index+1}}</td>
      <VTableCell :editable ="item.edit"
      :value="item.item?.title" 
      :options="nomenclatureItems"
      @load="onInput"
      @select="select(item,$event)"
      />
   
    <td>{{item.item?.type != 'product'?'--':'специализация'}}</td>
 <VTableCell :editable="item.edit"
:value="item.ruble + ''"
@stopEdit="item.ruble = +$event"
width="60px"
/>

 <VTableCell :editable="item.edit"
:value="item.penny + ''"
@stopEdit="item.penny = +$event"
width="60px"/>

    <td >
      <div class="actions">
   <VButton @click="toggleEdit(item)" rounded icon='edit' vStyle='cancel'></VButton>
   <VButton v-if="item.edit" vStyle='accept' rounded icon='save' @click="savePriceItem(item)"></VButton>
   <VButton v-if="item.edit" vStyle='delete' rounded icon='delete' @click="deletePriceItem(item.id)"></VButton>

     </div>
     
    </td>
    </tr>
    </TransitionGroup>
 </tbody>
</table> 
</div>


</div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { usePricesStore } from '../../stores/modules/prices/usePricesStore';
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import { onMounted } from 'vue';
import VSelect from '../../components/ui-components/VSelect.vue';
import { NomenclatureItem, PriceItem, Status } from '../../stores/models';
import VTableHeaderCell from '../../components/ui-components/table/VTableHeaderCell.vue';
import VTableCell from '../../components/ui-components/table/VTableCell.vue';
import { useNomenclatureItemsStore } from '../../stores/modules/nomenclature_items/useNomenclatureItemsStore';
import { usePriceItemsStore } from '../../stores/modules/price_items/usePriceItemsStore';
const route = useRoute()
const store = usePricesStore()
const {price,sortDirection} = storeToRefs(store)
onMounted(()=>{
   store.fetchOnePrice(`${route.params.id!}`)
})
const priceItemStore = usePriceItemsStore()
const toggleEdit = (item:PriceItem)=>{
   if(!item.edit)item.edit = true
else {
   item.edit = false
store.removeUsavedItems()
}

}
const deletePriceItem = (id?:string)=>{
   if(id)priceItemStore.removePriceItem(id).then(()=>{
      price.value!.priceItems = price.value!.priceItems.filter(i=>i.id !==id)
   })
}
const savePriceItem = (item:PriceItem)=>{
   if(!item.id){
store.addPriceItem(item)
   }
   else{
      priceItemStore.setPriceItem(item)
     priceItemStore.updatePriceItem().then(()=>{
   })  
   }
  
}

const nomenclatureStore = useNomenclatureItemsStore()
const {nomenclatureItems} = storeToRefs(nomenclatureStore)
const onInput = (v:any)=>{
   if(v)
   nomenclatureStore.fetchNomenclatureItems(v)
}
const select = (item:PriceItem,nItem:NomenclatureItem)=>{
item.item = nItem
}

</script>
<style scoped lang="scss">
@import '../../assets/table.css';
@import '../../assets/page-component.scss';
@import '../../assets/inline_input.scss';
@import '../../assets/show-animation.css';
.page{
   height: 100%;
   display: grid;
   grid-template-rows: min-content 480px;
   gap: 1rem;
}
section{
   display: grid;
   grid-auto-flow: column;
   gap: 1rem;
}
label{
   display: flex;
   align-items: center;
   gap:.4rem;
   }
   #title{
      width: 20rem;
   }
   .save_price{
      height: 100%;
      justify-self: right;
   }
.page_component{
    height: 100%;
   overflow-y: scroll;

}
.actions{
   width: 100%;
   display: flex;
   justify-content: center;
   gap: .4rem;
}

</style>