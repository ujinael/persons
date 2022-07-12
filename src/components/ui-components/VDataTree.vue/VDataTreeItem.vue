<template>
<li>
    <h3 
    :class="{full:children,open:open}"
     @click="toggleElement">{{label}}</h3>
    <ul v-if="children && open">
 <VDataTreeItem v-for="item in children"
:children = item.children
:label = "item.label"
:id="item.id"
/>
    </ul>
</li>
</template>
<script setup lang="ts">
import { useToggle } from '../../../compositon';
import { DataTree } from './VDataTree.vue';

const props = defineProps<{
id:string
children?:DataTree[]
label:string
}>()
const {elementVisible:open,toggleElement} = useToggle()
</script>
<style scoped lang="scss">
h3{
    cursor: pointer;
}
h3:hover{
    color: lightskyblue;
}
li{
    padding: 0 .5rem;
}
ul{
    list-style-type: none;
}
.full::after{
    background-image: url('../../../assets/diary.svg');
    background-repeat: no-repeat;
//   content: url('../../../assets/diary.svg');
    height:15px;
    width: 15px;
    background-color: transparent;
    border: 1px solid gray;
    // position: absolute;
        // content: '+';

}
.open.full::after{
      height:10px;
    width: 10px;
    //   content: url('../../../assets/diary.svg');

    // content: '-';
    // position: absolute;
}
</style>