<template>
  <div class="page_component" @scroll="onScroll">
    <VContextMenu :pos="contextPosition"  v-model="contextMenu">
<VDaySchedulleForm v-if="redactedDay"
@close="toggleContext"
:item="redactedDay"/>
    </VContextMenu>
    <VModal title="Сотрудники" v-model="elementVisible">
      <VEmployersPositions @select="onSelect" />
    </VModal>
    <table >
      <thead>
        <th class="row_title">
          <div class="row_title_content">
              Сотрудник
          <VButton @click="toggleElement" icon="add" rounded />
          </div>
        </th>
        <th
          v-for="(item, index) in [...Array(getDaysOfMonth).keys()]"
          :key="index"
        >
          {{ index + 1 }}
        </th>
      </thead>
      <tbody>
        <VEmployerTimeTableRow
          v-for="(item, index) in employerRows"
          :key="index"
          :item="item"
          @on-save="onSaveDays"
          @show-context="onShowContext"
        />
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEmployerSchedullesStore } from '../../stores/modules/employer_schedulles/useEmployerSchedullesStore';
import VEmployersPositions from '../../components/catalogues/VEmployersPositions.vue';
import VEmployerTimeTableRow from './VEmployerTimeTableRow.vue';
import VButton from '../../components/ui-components/VButton.vue';
import VModal from '../../components/VModal.vue';
import { useToggle } from '../../composition';
import { EmployersPositions } from '../../stores/models/employers_positions/EmployersPositions';
import { EmployerSchedulle } from '../../stores/models/employer_schedulle/EmployerSchedulle';
import { useMonthSchedullesStore } from '../../stores/modules/month_schedulles/useMonthSchedullesStore';
import { ref } from 'vue';
import VContextMenu from '../../components/ui-components/VContextMenu.vue';
import VDaySchedulleForm from '../../components/form-components/VDaySchedulleForm.vue';
import { DaySchedulle } from '../../stores/models';

const store = useEmployerSchedullesStore();
const monthStore = useMonthSchedullesStore();
const { monthSchedulle } = storeToRefs(monthStore);
const { elementVisible, toggleElement } = useToggle();
const { getDaysOfMonth, employerRows } = storeToRefs(store);
const onSelect = (item: EmployersPositions) => {
  if (monthSchedulle.value && monthSchedulle.value.id) {
    const employerSchedulle = new EmployerSchedulle(
      item.id!,
      monthSchedulle.value.id,
    );
    employerSchedulle.employerPosition = item;
    store.setEmployerSchedulle(employerSchedulle);
    store.saveEmployerSchedulle().then(() => {
      toggleElement();
    });
  }
};
const onSaveDays = (item: EmployerSchedulle) => {
  store.setEmployerSchedulle(item);
  store.updateEmployerSchedulle().catch((e) => {
    throw new Error(e.message);
  });
};
const {elementVisible:contextMenu,toggleElement:toggleContext} = useToggle()
const contextPosition = ref({top:0,left:0})
const redactedDay = ref<DaySchedulle|null>(null)
const onShowContext = (event:{ev:MouseEvent, day:DaySchedulle})=>{
const {ev,day} = event    
contextPosition.value.top = ev.pageY
contextPosition.value.left = ev.pageX
redactedDay.value = day
    toggleContext()
}
const onScroll = ()=>{
 contextMenu.value = false
  
}
</script>
<style scoped lang="scss">

.page_component{
  background-clip: border-box;
    box-sizing: border-box;
    overflow: auto;
    
}
table{
   width: 100%;
    border-collapse: collapse;
    border-radius: var(--common_border_radius);
}

thead{

    // background-color: rgb(212, 227, 222);
    position: sticky;
    z-index: var(--z_index-header);
    height: 2.5rem;
    top: 0px;
    left: 0px;
}
.row_title{
  padding:.4rem ;
 position: sticky;
  left: 0px;
}
.row_title_content {
      // border-top-left-radius: var(--common_border_radius);
box-shadow: var(--common_shadows);
border-radius: var(--common_border_radius);
  padding:.4rem;
 
  background-color: whitesmoke;
  // background: linear-gradient(to right,rgba(218, 217, 217, 1),rgba(246, 244, 244,.3));
  // backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
}
.actions {
  padding: 0.4rem;
}
</style>
