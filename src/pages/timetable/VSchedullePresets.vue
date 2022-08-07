<template>
<div class="presets">
    <div class="presets_content">
         <VModal title="Пресет" v-model="elementVisible">
<VPresetForm
@close="toggleElement"
/>
    </VModal>
<div class="card new">
<VButton @click="createNewPreset" rounded  icon="add"/>
<VButton @click="presetsStore.setRemovingPreset()" rounded vStyle="delete" icon="delete"/>

</div>
<VSchedullePreset v-for="(preset, index) in presets" :key="index"
:item="preset" 
@dblclick.stop="onEdit(preset)"
@click.stop= "presetsStore.setActive(preset)"
/> 
    </div>
  

</div>
</template>
<script setup lang="ts">
import VSchedullePreset from './VSchedullePreset.vue';
import { useSchedullePresetsStore } from '../../stores/modules/schedulle_presets/useSchedullePresetsStore';
import { storeToRefs } from 'pinia';
import VModal from '../../components/VModal.vue';
import { useToggle } from '../../composition';
import VPresetForm from '../../components/form-components/VPresetForm.vue';
import { SchedullePreset } from '../../stores/models/schedulle_preset/schedulle_preset';
import VButton from '../../components/ui-components/VButton.vue';

const presetsStore = useSchedullePresetsStore()
const {presets,preset} = storeToRefs(presetsStore)
const {elementVisible,toggleElement} = useToggle()

const createNewPreset=()=>{
if(preset.value)preset.value = null
presetsStore.setSchedullePreset()
toggleElement()
}
const onEdit = (item:SchedullePreset)=>{
presetsStore.setSchedullePreset(item)
toggleElement()

}
</script>
<style scoped lang="scss">
.presets{
   box-sizing: border-box;
    overflow-x: scroll;   
        width: 100%;
    padding:.8rem .5rem ;
background-color: rgba(255, 255, 255, 0);
    box-shadow: 0px 0px 4px;
        border-radius: var(--common_border_radius);

}
.presets_content{
    
    border-radius: var(--common_border_radius);
       box-sizing: border-box;

    display: grid;
    width: min-content;
    grid-auto-flow: column;
        // overflow-x: scroll;   

    // width: 100%;
    padding:.8rem .5rem ;
  
    gap:1rem;
    justify-content: left;

}
.new{
    font-size: xx-large;
    display: grid;
    grid-auto-flow: column;
    justify-items: center;
    align-items: center;
}

@import '../../assets/card.scss';
</style>