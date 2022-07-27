<template>
<div class="catalogue">
    <ul v-if="!store.loading">
        <li v-for="item in nomenclatureItems"
        :key="item.id"
        class="catalog_item"
        >
<h4 class="title">
    {{item.title}}
</h4>
<div class="description">
    {{item.description}}
</div>
<div class="actions">
    <span class="action">изменить</span>
    <span class="action">удалить</span>

</div>


        </li>
    </ul>
    <VLoader v-else/>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useNomenclatureItemsStore } from '../../stores/modules/nomenclature_items/useNomenclatureItemsStore';
import VLoader from '../ui-components/VLoader.vue';

const store = useNomenclatureItemsStore()
const {nomenclatureItem,nomenclatureItems} = storeToRefs(store)
onMounted(()=>{
    store.fetchNomenclatureItems()
})
</script>
<style scoped lang="scss">
@import '../../assets/catalogues.scss';
@import '../../assets/row_actions.scss';
.catalogue{
    width: 100%;
}
</style>