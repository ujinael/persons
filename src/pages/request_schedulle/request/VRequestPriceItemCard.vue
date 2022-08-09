<template>
<li class="card">
    <div class="card_content">
        <h5>
    {{item.item?.title}}
        </h5>
        <sup>
            {{item.ruble}} руб
            {{item.penny}} к
        </sup>
    </div>
    <div class="card_controls">
<VButton @click="decreaseCount" rounded>&minus;</VButton>
<span>{{count}}</span>
<VButton @click="increaseCount" rounded>&plus;</VButton>

    </div>
</li>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { PriceItem, RequestNomenclatureItem } from '../../../stores/models';
import VButton from '../../../components/ui-components/VButton.vue';
import { useRequestSchedullesStore } from '../../../stores/modules/request_schedulles/useRequestSchedullesStore';
import { storeToRefs } from 'pinia';

const props = defineProps<
{
 item:PriceItem   
}>()
const requestStore = useRequestSchedullesStore()
const {requestSchedulle} = storeToRefs(requestStore)
const count = ref(0)
const decreaseCount = ()=>{
    count.value -= 1
}
const increaseCount = ()=>{
    count.value += 1
    const newItem = new RequestNomenclatureItem(
        props.item.ruble,props.item.penny,count.value
    )
    newItem.item = props.item.item!
    requestSchedulle.value?.nomenclatureItems.push(newItem)
}
</script>
<style scoped lang="scss">
.card{
    width: 100%;
    height: 9rem;
display: grid;
grid-template-rows: 7rem min-content;
gap: 1rem;
}
.card_content{
    height: 7rem;
    margin: .6rem;
    border-radius: var(--common_border_radius);
    background-color: white;
    box-shadow: var(--common_shadows);
    display: grid;
    align-content: space-between;

}
.card_controls{
    
    display: flex;
    justify-content: space-between;
        margin:0 1.2rem;
}
button{
    // height: 100%;
    background-color: lightblue;
}
</style>