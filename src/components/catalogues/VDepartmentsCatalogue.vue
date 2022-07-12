<template>
<div class="catalogue">

    <ul>
        <li v-for="item in departments"
        :key="item.id"
        @click="emit('select',item)"
        >
<h4 class="title">
    {{item.title}}
</h4>
<div class="description">
    {{item.description}}
</div>
        </li>
    </ul>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useDepartmentsStore } from '../../stores/modules/departments/useDepartmentsStore';
const emit = defineEmits(['select'])
const store = useDepartmentsStore()
const {departments} = storeToRefs(store)
onMounted(()=>{
store.fetchDepartments()
})
</script>
<style scoped lang="scss">
@import '../../assets/catalogues.scss';
</style>