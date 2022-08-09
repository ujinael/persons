<template>
<fieldset ref="fieldset">
  <VRequestDropdown v-model="dropdownVisible" ref="dropdown">
  <VRequestPriceList/>
  </VRequestDropdown>
   <legend @click="showDropDown">Номенклатура</legend>
     <div class="cards">
<!-- <VRequestEventCard 
v-for="(item, index) in [...Array(10)].keys()" :key="index"
/> -->
<ul v-if="requestSchedulle">

  <li v-for="(item, index) in requestSchedulle.nomenclatureItems" :key="index">
{{item.coast}}
  </li>
</ul>
 </div>

</fieldset>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VRequestPriceList from './VRequestPriceList.vue'
import VRequestDropdown from './VRequestDropdown.vue';
import { useToggle } from '../../../composition';
import { useRequestSchedullesStore } from '../../../stores/modules/request_schedulles/useRequestSchedullesStore';
import { storeToRefs } from 'pinia';

const fieldset = ref<HTMLFieldSetElement>()
const dropdown = ref<InstanceType<typeof VRequestDropdown>>()
const store = useRequestSchedullesStore()
const {requestSchedulle} = storeToRefs(store)
const {elementVisible:dropdownVisible,toggleElement:toggleDropdown} = useToggle()
const showDropDown = ()=>{
if(!fieldset.value )return
if(!dropdown.value)return
const rect = fieldset.value.getBoundingClientRect()
dropdown.value.pos.width = rect.width + 'px'
dropdown.value.pos.top = rect.bottom + 'px'
dropdown.value.pos.left = rect.left + 'px'
toggleDropdown()
}
onMounted(()=>{
  dropdownVisible.value = true
})
</script>
<style scoped lang="scss">
@import '../../../assets/request_component.scss';
</style>