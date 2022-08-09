<template>
<div class="page">
 
 <VRequestPageComponent/>
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
import { onMounted, ref } from 'vue';
import { useSchedulleEventsStore } from '../../stores/modules/schedulle_events/useSchedulleEventsStore';
import VScheduller from './scheduller/VScheduller.vue';
import VRequestPageComponent from './request/VRequestPageComponent.vue'
const store = useSchedulleEventsStore()
const {employerSchedulles,organizationWorkingInterval} = storeToRefs(store)



onMounted(()=>{
    store.fetchEmployerSchedulle()
})
</script>
<style scoped lang="scss">
.page{
    display: grid;
    gap:1rem;
    grid-template-rows: min-content 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: .8rem;
    box-sizing: border-box;
}

</style>