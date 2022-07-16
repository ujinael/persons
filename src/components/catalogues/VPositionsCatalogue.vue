<template>
<div class="catalogue" >

    <ul v-if="!store.loading">
<li v-if="!positions.length" class="info">
<span>В отделении нет должностей. <strong>Создать+</strong></span>
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
<div v-if="item.jobDescription" class="job_description">
<a :href="`http://localhost:5000/images/${item.jobDescription}`">Должностная инструкция</a>
</div>
<div v-else class="upload">
    <VUploadInput @select="onSelect($event,item.id)"/>
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
const emit = defineEmits(['select'])
const store = usePositionsStore()
const {positions} = storeToRefs(store)
const onSelect = (file:any,id:string)=>{
    console.log(file);
    
 store.uploadJobDescription(file,id)
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
</style>