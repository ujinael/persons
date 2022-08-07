<template>
<div class="page">
 
 <VScheduller v-if="organizationWorkingInterval"
 :col-width="200"
 :employer-schedulles="employerSchedulles"
 :row-height="60"
 :time-step="15"
 :start="organizationWorkingInterval.start"
 :end="organizationWorkingInterval.end"
 />
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useTaskSchedullesStore } from '../../stores/modules/task_schedulles/useTaskSchedullesStore';
import VScheduller from './scheduller/VScheduller.vue';

const store = useTaskSchedullesStore()
const {employerSchedulles,organizationWorkingInterval} = storeToRefs(store)
onMounted(()=>{
    store.fetchEmployerSchedulle()
})
</script>
<style scoped lang="scss">
</style>