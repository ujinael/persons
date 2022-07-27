<template>
<form @submit.prevent="onSave" v-if="nomenclatureItem">
<label >Название: </label><VInput v-model="nomenclatureItem.title"/>
<label >Короткое название: </label>
<VInput v-model="nomenclatureItem.shortTitle"/>
<label >Тип: </label>
<VSelect v-model="nomenclatureItem.type" 
:options="Object.keys(types)" 
:label="types[nomenclatureItem.type]"/>
<label >Ед. изм.:
</label>
<VSelect v-model="nomenclatureItem.measureUnit" 
:options="measureUnits" 
:label="nomenclatureItem.measureUnit?nomenclatureItem.measureUnit.shortTitle:'выбрать'"/>
<label >Описание</label>
<VInput v-model="nomenclatureItem.description"/>
<div class="actions">
    <VButton type="submit">Сохранить</VButton>
        <VButton @click="emit('close')" vStyle='cancel'>Отмена</VButton>
</div>
</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNomenclatureItemsStore } from '../../stores/modules/nomenclature_items/useNomenclatureItemsStore';
import VInput from '../ui-components/VInput.vue';
import VSelect from '../ui-components/VSelect.vue';
import { NomenclatureType } from '../../stores/models/nomenclature_item/NomenclatureItem';
import { useMeasureUnitsStore } from '../../stores/modules/measure_units/useMeasureUnitsStore';
import { onMounted } from 'vue';
import VButton from '../ui-components/VButton.vue';
const store = useNomenclatureItemsStore()
const {nomenclatureItem} = storeToRefs(store)
const measuresStore = useMeasureUnitsStore()
const {measureUnits} = storeToRefs(measuresStore)
const emit = defineEmits(['close'])

onMounted(()=>{
   measuresStore.fetchMeasureUnits() 
})
const types= {[NomenclatureType.PRODUCT]:'продукт',
    [NomenclatureType.MEDICAL_SERVICE]:'медицинская услуга',
   [NomenclatureType.SERVICE]:'услуга' }

const onSave = ()=>{
    if(nomenclatureItem.value)
    {
    if(nomenclatureItem.value.id){        
    }
    else{
        store.saveNomenclatureItem().then(()=>{
            emit('close')
        })
    }
    }
}
</script>
<style scoped lang="scss">
@import '../../assets/form.css';
form{
    width: 100%;
    grid-template-columns:10rem  1fr;
    justify-items:flex-start;
}
input{
    width: 100%;
}
</style>