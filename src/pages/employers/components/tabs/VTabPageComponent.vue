<template>
<div class="page_component">
<div class="header">
    <h3>
  Опции
  </h3>
</div>
<div class="main">
  
  <VTabBar class="tabbar" :align="'start'">
    <VTabBarItem v-model="selectedView" title="Должности" value="positions"/>
    <VTabBarItem  v-model="selectedView" title="Паспорта" value="passports"/>
    <VTabBarItem  v-model="selectedView" title="Адреса" value="adresses"/>
    <VTabBarItem  v-model="selectedView" title="Документы" value="docs"/>
  </VTabBar>
  <div class="content">
    <component :is="tabs[selectedView]"></component>
  </div>
</div>
  
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import VTabPositionsComponent from './VTabPositionsComponent.vue'
import VTabBar from '../../../../components/ui-components/VTabBar.vue';
import VTabBarItem from '../../../../components/ui-components/VTabBarItem.vue';
import VTabPassportsComponent from './VTabPassportsComponent.vue';
import VTabAddressesComponent from './VTabAddressesComponent.vue';
import VTabDocumentsComponent from './VTabDocumentsComponent.vue';
const selectedView = ref<keyof typeof tabs>('positions')
const tabs = {
  positions:VTabPositionsComponent,
    passports:VTabPassportsComponent,
      addresses:VTabAddressesComponent,
        docs:VTabDocumentsComponent



}

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
</style>