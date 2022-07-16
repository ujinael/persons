<template>
<div class="catalogue" >
   <VModal v-model="showForm" :title="'Должность'">
<VPositionForm @close="store.toggleForm"/>
    </VModal>
    <ul v-if="!store.loading">
<li v-if="!positions.length" class="info">
<span>В отделении нет должностей. <strong @click="createPosition">Создать+</strong></span>
</li>
        <li v-else class="catalog_item" v-for="item in positions"
        :key="item.id"
        @click="emit('select',item)"
        >
<h4 class="title">
    {{item.title}}
</h4>
<div class="description">
    {{item.description}}
</div>
<div class="job_description">
<a class="job_desc_label" v-if="item.jobDescription"  :href="`http://localhost:5000/images/${item.jobDescription}`">Должностная инструкция</a>
<span class="job_desc_label" v-else>Должностная инструкция не загружена</span>

<div class="actions">
     <VUploadInput  @select="onSelect($event,item.id)">
    <span v-if="item.jobDescription" class="action">обновить</span>

     <span v-else class="action">загрузить</span>
     </VUploadInput>
     <span class="action">удалить</span>
</div>

</div>

        </li>

    </ul>
<VLoader v-else/>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePositionsStore } from '../../stores/modules/positions/usePositionsStore';
import VUploadInput from '../ui-components/VUploadInput.vue';
import VLoader from '../ui-components/VLoader.vue';
import VModal from '../VModal.vue';
import VPositionForm from '../form-components/VPositionForm.vue';
const emit = defineEmits(['select'])
const store = usePositionsStore()
const {positions,showForm} = storeToRefs(store)
const onSelect = (file:any,id:string)=>{
    console.log(file);
    
 store.uploadJobDescription(file,id)
}
const createPosition = ()=>{
store.setPosition()
store.toggleForm()
}
</script>
<style scoped lang="scss">
@import '../../assets/catalogues.scss';
.catalogue{
    min-height: 150px;
}
strong{
    color: blue;
    text-decoration-line: underline;
}
strong:hover{
    cursor: pointer;
    color: violet;
}
.job_desc_label{
    font-size: 14px;
    color: green;
}
li{
    display: grid;
}

@import '../../assets/row_actions.scss';
.action{
display: flex;
}
</style>