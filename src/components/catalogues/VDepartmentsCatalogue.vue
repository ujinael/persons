<template>
<div class="catalogue">

    <ul v-if="!store.loading">
        <li v-for="item in departments"
        :key="item.id"
        @click="emit('select',item)"
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
<div class="positions_count additional" 
 :class="{selected:item.id === store.department?.id}"
v-if="item.positions"
@click="showPositions(item)"
>
{{`Дожности: ${item.positions.length}`}}
</div>

        </li>
    </ul>
    <VLoader v-else/>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { Department } from '../../stores/models/department/Department';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
import VLoader from '../ui-components/VLoader.vue';
const emit = defineEmits(['select'])
const store = useDepartmentsStore()
const positionsStore = usePositionsStore()
const {departments,department} = storeToRefs(store)
const showPositions = (item:Department)=>{
    if(department.value?.id !== item.id! ){
   store.setDepartment(item)
positionsStore.fetchAllPositions(item.id)     
    }
else{
    console.log('this');
    
    positionsStore.positions = []
    store.department = null
}
}
onMounted(()=>{
store.fetchDepartments()
})
</script>
<style scoped lang="scss">
@import '../../assets/catalogues.scss';
li{
 display: grid;   
}
.title {
grid-area: 1/1/2/2;
}
.description {
grid-area: 2/1/3/2;
}
.actions{
 grid-area: 3/1/4/2; 
 display: flex;
 gap:.2rem;
}
.action{
color: blue;
font-size: small;
opacity: .7;
}
.action:hover{
    cursor: pointer;
opacity: 1;
}
.additional {
    grid-area: 1/2/4/3;
    justify-self: right;
    align-self: center;
    color:rgb(3, 151, 3,.8);
    font-size: small;

}
.additional:hover{
cursor: pointer;
color: rgb(3, 151, 3,1);
}
.selected::after{
    content: ' >';
}
.catalog_item:hover{
    cursor:auto;
}
.selected,.selected:hover{
color: orange
}

</style>