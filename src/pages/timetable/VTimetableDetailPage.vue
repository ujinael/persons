<template>
  <div class="page">
    <!-- <VPageComponent label="Расписание"> -->
      <VConfirm v-model="confirm"
      @confirm="onConfirm"
      >
      Расписание отсуствует, нажмите Подтвердить для создания нового расписания.
      </VConfirm>
      <div class="month_selector">
        <VButton id="date_buttons" rounded @click="onMonthChange('decrease')"
          >-</VButton
        >
        {{ useDateFormat(currentDate, 'MM-YYYY').value }}
        <VButton id="date_buttons" rounded @click="onMonthChange('increase')"
          >+</VButton
        >
      </div>
        <VSchedullePresets />
  
   <VEmployerSchedulles/>
  </div>
</template>
<script setup lang="ts">
import VPageComponent from '../common_components/VPageComponent.vue';
import VButton from '../../components/ui-components/VButton.vue';
import { useEmployerSchedullesStore } from '../../stores/modules/employer_schedulles/useEmployerSchedullesStore';
import { storeToRefs } from 'pinia';
import { useDateFormat } from '@vueuse/core';
import { onMounted } from 'vue';

import VSchedullePresets from './VSchedullePresets.vue';
import VEmployerSchedulles from './VEmployerSchedulles.vue';
import { useSchedullePresetsStore } from '../../stores/modules/schedulle_presets/useSchedullePresetsStore';
import { useRoute, useRouter } from 'vue-router';
import { useMonthSchedullesStore } from '../../stores/modules/month_schedulles/useMonthSchedullesStore';
import { useToggle } from '../../composition';
import VConfirm from '../../components/ui-components/VConfirm.vue';
const store = useEmployerSchedullesStore();
const monthStore = useMonthSchedullesStore()
const {elementVisible:confirm,toggleElement:toggleConfirm} = useToggle()
const { currentDate } = storeToRefs(store);
const presetsStore = useSchedullePresetsStore()
const route = useRoute()
const router = useRouter()
onMounted(() => {
presetsStore.fetchSchedullePresets()
if(route.params.id && typeof route.params.id === 'string'){
    store.fetchEmployerSchedulles(route.params.id);
monthStore.fetchOneMonthSchedulle(route.params.id)
}

});
const onMonthChange = (direction:'increase'|'decrease')=>{
let newDate:Date
if(direction === 'decrease')newDate = store.decreaseMonth() 
else newDate = store.increaseMonth() 
console.log(newDate.getMonth());

monthStore.fetchMonthSchedulleByDateComponents(newDate.getMonth(),newDate.getFullYear())
.then(()=>{
  console.log(monthStore.monthSchedulle!.id!);
router.push(`/timetable/${monthStore.monthSchedulle!.id!}`)
store.fetchEmployerSchedulles(monthStore.monthSchedulle!.id!).then(()=>{
  store.currentDate = newDate

})
})
.catch(()=>{
  toggleConfirm()
})

}

const onConfirm = ()=>{}
</script>
<style scoped lang="scss">

.presets{
  width: 100%;
}
.page {
  display: grid;
  gap: 1rem;
  grid-template-rows:min-content min-content 1fr ;
  // grid-template-columns: 1fr;
}
#date_buttons {
  width: 1.5rem;
}


</style>
