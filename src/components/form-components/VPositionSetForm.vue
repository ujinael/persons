<template>
<form @submit.prevent>
<VSelect 
v-model="department"
:label="department?.title"
:options="departments
.map(d=>{return{id:d.id!,title:d.title,value:d}})"
@select="selectDepartment($event.value.id)"
/>
<VSelect 
v-if="department"
v-model="position"
:label="position?.title"
:options="positions
.map(d=>{return{id:d.id!,title:d.title,value:d}})"
@select="emit('select',$event.value.id)"
/>


</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
import VSelect from '../ui-components/VSelect.vue';
const departmentStore = useDepartmentsStore()
const  {departments,department} = storeToRefs(departmentStore)
const positionStore = usePositionsStore()
const  {positions,position} = storeToRefs(positionStore)
const emit = defineEmits(['select'])
onMounted(()=>{
    departmentStore.fetchDepartments()
})
const selectDepartment=(id:string)=>{
positionStore.fetchAllPositions(id).then(()=>{
     position.value = null  
}

)
}
</script>
<style scoped lang="scss">
form{
    background-color: white
}
@import '../../assets/form.css';
</style>