<template>
<div class="page_component">
<div class="header">
    <h3>
  Опции
  </h3>
</div>
<div class="main">
  
  <VTabBar v-model="direction" :activeView="selectedView" class="tabbar" :align="'start'">
      <VTabBarItem class="t" v-for="item in tabsArray" 
      :key = item v-model="selectedView"
      :title="mapNames[item]"
       :value="item"/>
  </VTabBar>
  <div class="content">
    <transition :name="direction" mode="out-in">
        <component :is="tabs[selectedView]" :personID="person?.id"></component>
    </transition>
  </div>
</div>
  
</div>
</template>
<script setup lang="ts">
import {  onMounted, ref } from 'vue';
import VTabPositionsComponent from './VTabPositionsComponent.vue'
import VTabBar from '../../../../components/ui-components/VTabBar.vue';
import VTabBarItem from '../../../../components/ui-components/VTabBarItem.vue';
import VTabPassportsComponent from './VTabPassportsComponent.vue';
import VTabAddressesComponent from './VTabAddressesComponent.vue';
import VTabDocumentsComponent from './VTabDocumentsComponent.vue';
import {  usePersonsStore } from '../../../../stores/modules';
import { storeToRefs } from 'pinia';
const selectedView = ref<keyof typeof tabs>('passports')
const props = defineProps<{
tabsArray:Array<keyof typeof tabs>
}>()
onMounted(()=>{
  selectedView.value = props.tabsArray[0]??'passports'
})
const mapNames = {
  positions:'Должности',
  passports:'Паспорта',
  addresses:'Адреса',
  docs:'Документы'
}
const tabs = {
  positions:VTabPositionsComponent,
    passports:VTabPassportsComponent,
      addresses:VTabAddressesComponent,
        docs:VTabDocumentsComponent
}
const direction = ref<'next'|'prev'>('next')

const store = usePersonsStore()
const {person} = storeToRefs(store)
</script>
<style scoped lang="scss">
@import '../../../../assets/page-component.scss';
@import '../../../../assets/default_tab_item.scss';
.page_component{
  height: 25rem;
}
.tabbar{
  margin-bottom: 1rem;
}


@import '../../../../assets/slide-animation.scss';
// @import '../../../../assets/show-animation.css';
</style>