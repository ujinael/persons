<template>
<div class="page">
    <VPageComponent label="Расписание">
<VButton id="date_buttons" rounded @click="store.decreaseMonth">-</VButton>
{{useDateFormat(currentDate,'MM-YYYY')}}
<VButton id="date_buttons" rounded @click="store.increaseMonth">+</VButton>

    </VPageComponent>
    <div class="page_component">
         <table>
<thead>
<th>Сотрудник</th>
<th v-for="(item, index) in [...Array(getDaysOfMonth).keys()]" :key="index">
{{index + 1}}
</th>
</thead>
<tbody>

    <tr v-for="(item, index) in employerRows" :key="index">
<td 

>{{item.employer?.person?.surname}}</td>
<DragSelect  v-for="(day, i) in item.days" :key="i"  :selectorClass="i">
     <template #slot="{ selectedItems }">
    <td :class="{i:true}"
 >
{{i + 1}}
</td>    
 <!-- Your items here -->
    </template>
    
</DragSelect>
 
 </tr>
   
</tbody>
    </table>
    </div>
   
</div>
</template>
<script setup lang="ts">
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import { useEmployerSchedullesStore } from '../../stores/modules/employerSchedulles/useEmployerSchedullesStore';
import { storeToRefs } from 'pinia';
import { useDateFormat } from '@vueuse/core';
import { onMounted } from 'vue';
import DragSelect from 'vue-drag-select/src/DragSelect.vue'

const store = useEmployerSchedullesStore()

const {currentDate,getDaysOfMonth,employerRows} = storeToRefs(store)
onMounted(()=>{
    store.fetchEmployers()
})
const select = (item)=>{
console.log(`select ${item}`);

}
const drag = (item)=>{
console.log(`drag ${item}`);

}
</script>
<style scoped lang="scss">
.page{
    display: grid;
    gap:1rem;
}
#date_buttons{
    width: 1.5rem;
}
td:hover{
    cursor: pointer;
    background-color: rgb(237, 233, 233);
    transition: background-color .2s ease-in;
}
@import '../../assets/table.css';
@import '../../assets/page-component.scss';


</style>