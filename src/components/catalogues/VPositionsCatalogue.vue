<template>
<div class="catalogue">

    <ul>
        <li v-for="item in positions"
        :key="item.id"
        @click="emit('select',item)"
        >
<h4 class="title">
    {{item.title}}
</h4>
<div class="description">
    {{item.description}}
</div>
<div v-if="item.jobDescription" class="job_description">
<a :href="`http://localhost:5000/images/${item.jobDescription}`">Должностная инструкция</a>
</div>
<div v-else class="upload">
    <VUploadInput/>
</div>
        </li>

    </ul>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
import VUploadInput from '../ui-components/VUploadInput.vue';
const emit = defineEmits(['select'])
const store = usePositionsStore()
const {positions} = storeToRefs(store)
onMounted(()=>{
store.fetchAllPositions()
})
</script>
<style scoped lang="scss">
@import '../../assets/catalogues.scss';
</style>