<template>
<div class="catalogue">
<ul >
    <li class="catalog_item" v-for="(item, index) in employersPositions" :key="index"
    @click="onClickItem(item)"
    >
    <h4>
        {{`${item.employer?.person?.surname} ${item.employer?.person?.name[0]}. ${item.employer?.person?.patronymic[0]}`}}
    </h4>
    <div class="description">
        {{item.position?.title}}
    </div>
    </li>
</ul>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { EmployersPositions } from '../../stores/models/employers_positions/EmployersPositions.js';
import { useEmployersPositionsStore } from '../../stores/modules/employers_positions/useEmployersPositionsStore.js';

const store = useEmployersPositionsStore()
const {employersPositions} = storeToRefs(store)

onMounted(()=>{
store.fetchEmployersPositionss()
})
const emit = defineEmits<{
  (event: 'select',item:EmployersPositions): void
}>()
const onClickItem = (item:EmployersPositions)=>{
emit('select',item)
}
</script>
<style scoped lang="scss">
.catalogue{
    width: 400px;
}
.catalog_item{
    cursor: pointer;
}
@import '../../assets/catalogues.scss';
</style>