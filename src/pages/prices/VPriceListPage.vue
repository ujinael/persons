<template>
<VPageComponent  label="Прайс-листы">
    <template #rbuttons>
        <VButton rounded>&plus;</VButton>
    </template>
<div class="catalogue">

    <ul v-if="!store.loading">
        <li  v-for="item in prices"
        :key="item.id"
        class="catalog_item"
        @dblclick="onItemDbclick(item.id)"
        >
<h4 class="title">
    {{item.title?item.title:'новый прайс'}}
</h4>
<div class="description">
    {{item.status}}
</div>


        </li>
    </ul>
    <VLoader v-else/>
</div>
</VPageComponent>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePricesStore } from '../../stores/modules/prices/usePricesStore';
import VPageComponent from '../common_components/VPageComponent.vue';
import VLoader from '../../components/ui-components/VLoader.vue';
import VButton from '../../components/ui-components/VButton.vue';
const store = usePricesStore()
const {prices,price} = storeToRefs(store) 
const router = useRouter()
onMounted(()=>{
    store.fetchPrices()
})
const onItemDbclick = (id?:string)=>{
    if(id){
// price.value = prices.value.find(p=>p.id === id)!
      router.push(`/prices/${id}`)
  
    }
}
</script>
<style scoped lang="scss">
.page_component{
    height: 100%;
}
.catalogue{
    // width: 800px;
}
li{
    user-select: none;
}
li:hover{
cursor: pointer;

}
@import '../../assets/catalogues.scss';
</style>