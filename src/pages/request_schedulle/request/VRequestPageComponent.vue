<template>
<div class="request">
<VRequestClientComponent/>
<VRequestEventsComponent/>
<VRequestNomenclatureComponent ref="nomenclature" class="last" @show-drop-down="emit('showDropDown',nomenclature)"/>
</div>
</template>
<script setup lang="ts">
import VRequestEventsComponent from './VRequestEventsComponent.vue';
import VRequestClientComponent from './VRequestClientComponent.vue';
import VRequestNomenclatureComponent from './VRequestNomenclatureComponent.vue';
import { ref } from 'vue';
const title = 'Заявка'

const nomenclature = ref<HTMLFieldSetElement>()
const emit = defineEmits(['showDropDown'])

</script>
<style scoped lang="scss">
@import '../../../assets/page-component.scss';
.request{
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 140px 1fr 1fr;
    box-sizing: border-box;
    width: 100%;
}
 .request>fieldset:not(.last){
border-right: 4px solid lightgray;
 }

</style>