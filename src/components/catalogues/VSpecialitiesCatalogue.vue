<template>
<div class="catalogue">

    <ul v-if="!store.loading">
        <li v-for="item in specialities"
        :key="item.id"
        @click="emit('select',item)"
        class="catalog_item"
        >
<h4 class="title">
    {{item.title}}
</h4>
<div class="description">
    {{item.description}}
</div>
<div class="actions">
    <span class="action">изменить</span>
    <span class="action">удалить</span>
</div>
        </li>
    </ul>
    <VLoader v-else/>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useSpecialitiesStore } from '../../stores/modules/specialities/useSpecialitiesStore';
import VLoader from '../ui-components/VLoader.vue';
const emit = defineEmits(['select'])
const store = useSpecialitiesStore()
const {specialities} = storeToRefs(store)
onMounted(()=>{
store.fetchAllSpecialities()
})
</script>
<style scoped lang="scss">
@import '../../assets/catalogues.scss';
li{
 display: grid;   
}
.title {
grid-area: 1/1/2/2;
}
.description {
grid-area: 2/1/3/2;
}
@import '../../assets/row_actions.scss';
.actions{
    grid-area: 3/1/4/2; }
.additional {
    grid-area: 1/2/4/3;
    justify-self: right;
    align-self: center;
    color:rgb(3, 151, 3,.8);
    font-size: small;

}
.additional:hover{
cursor: pointer;
color: rgb(3, 151, 3,1);
}
.selected::after{
    content: ' >';
}
.catalog_item:hover{
    cursor:auto;
}
.selected,.selected:hover{
color: orange
}

</style>