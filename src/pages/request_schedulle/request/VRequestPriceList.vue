<template>
<div class="price_list_component">
    <input type="text" placeholder="поиск...">
    <VTabBar :align="'start'">
        <VTabBarItem title="услуги" v-model="type" :value="'services'"></VTabBarItem>
        <VTabBarItem title="товары" v-model="type" :value="'products'"></VTabBarItem>

    </VTabBar>
    <ul class="list" v-if="price">
        <VRequestPriceItemCard :item="item" v-for="item in price.priceItems"/>
    </ul>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { usePricesStore } from '../../../stores/modules/prices/usePricesStore';
import VRequestPriceItemCard from './VRequestPriceItemCard.vue';
import VTabBar from '../../../components/ui-components/VTabBar.vue';
import VTabBarItem from '../../../components/ui-components/VTabBarItem.vue';

const store = usePricesStore()

const {price} = storeToRefs(store)
onMounted(() => {
    store.fetchOnePrice('3fdfef39-703c-4541-8ca0-af4043812dae')
})
const type = ref<'services'|'products' >('services')
</script>
<style scoped lang="scss">
@import '../../../assets/inline_input.scss';
.price_list_component{
    height: 100%;
    display: grid;
    gap:.8rem;
    // width: 100%;
    box-sizing: border-box;

}
ul{
    box-sizing: border-box; 
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3,8.5rem);
    justify-content: space-between;
    gap: 1.5rem 0;
    overflow-y: auto;
}
.tab{
border-bottom:4px solid transparent;
color: black;
transition: opacity .2s ease-in ;
opacity: .5;
}
.tab:hover:not(.active){
transition: opacity .2s ease-in ;
border-bottom:4px solid transparent;
color: black;
opacity: 1;    
}
.active{
transition: all .3s ease-in;
opacity: 1;
color: rgb(87, 184, 244);
border-bottom:4px solid rgb(87, 184, 244)
}
</style>