<template>
<div class="data_tree">
  <h3>{{data.label}}  </h3>
  <ul>
    <VDataTreeItem v-for="item in data.children"
:children = item.children
:label = "item.label"
:id="item.id"
/>
  </ul>


</div>

</template>
<script setup lang="ts">
import VDataTreeItem from './VDataTreeItem.vue';
export type DataTree ={
    id:string
    children?:DataTree[]
    label:string
}
const props = defineProps<{
data:DataTree
}>()
</script>
<style scoped lang="scss">
ul{
    text-align: left;
    list-style-type: none;
}
</style>