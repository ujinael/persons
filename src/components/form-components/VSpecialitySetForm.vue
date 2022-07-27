<template>
<form @submit.prevent>
<VSelect 
v-model="speciality"
:label="speciality?.title"
:options="specialities
.map(d=>{return{id:d.id!,title:d.title,value:d}})"
@select="emit('select',$event.value.id)"
/>



</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useSpecialitiesStore } from '../../stores/modules/specialities/useSpecialitiesStore';
import VSelect from '../ui-components/VSelect.vue';
const store = useSpecialitiesStore()
const  {specialities,speciality} = storeToRefs(store)
const emit = defineEmits(['select'])
onMounted(()=>{
    store.fetchAllSpecialities()
})


</script>
<style scoped lang="scss">
form{
    background-color: white
}
@import '../../assets/form.css';
</style>