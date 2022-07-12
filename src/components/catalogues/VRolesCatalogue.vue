<template>
<div class="catalogue">

    <ul>
        <li v-for="item in roles"
        :key="item.id"
        @click="emit('select',item)"
        >
{{item.description}}
        </li>
    </ul>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRolesStore } from '../../stores/modules/roles/useRolesStore';
const emit = defineEmits(['select'])
const store = useRolesStore()
const {roles} = storeToRefs(store)
onMounted(()=>{
store.fetchRoles()
})
</script>
<style scoped lang="scss">
.catalogue{
    width: 450px;
}
ul{
    list-style: none;
}
li{
    text-align: left; 
       padding:.25rem 0;
    border-bottom: 1px solid lightgray;
}
li:hover{
    cursor: pointer;
    background-color: rgb(242, 247, 250);
}
</style>