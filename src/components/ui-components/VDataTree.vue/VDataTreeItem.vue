<template>
<li>
    <div class="title" >
         <ArrowIco class="icon" :class="{forward_arrow:!open,down_arrow:open}"/>
           <h3 @click="clickOnNode(node)"
    :class="{full:node.children,open:open}"
     > 
      <input v-if="node.edit"
 v-focus
@blur.stop="saveRedactedNode" 
 type="text" v-model="node.name"/>
    <span v-else>{{node.name}}</span> 
     </h3> 
    </div>
<Transition name="fade">
    <ul v-if="node.children && open">
 <VDataTreeItem v-for="item in node.children"

:node = item
@save-category="emit('saveCategory',$event)"
@select-node="emit('selectNode',$event)"
@lazy-load="emit('lazyLoad',$event)"
@select-item="emit('selectItem',$event)"
/>

<section v-if="node.items.length">
<li v-for="(item, index) in node.items" :key="index">
<span class="item noselect" @dblclick="emit('selectItem',item)">{{item.title}}</span>
</li>
</section>
    </ul>
    </Transition>
</li>
</template>
<script setup lang="ts">
import { useToggle } from '../../../compositon';
import {DataTree,Data} from '../../../stores/models'
import ArrowIco from '../../../assets/right-arrow-svgrepo-com.svg'
const props = defineProps<{
node:DataTree<Data>
}>()
const emit = defineEmits(['saveCategory','selectNode','lazyLoad','selectItem'])
const clickOnNode = (node?:DataTree<Data>)=>{
    if(!open.value){
    emit('lazyLoad',node)
    }
    emit('selectNode',props.node)
    toggleElement()
}
const {elementVisible:open,toggleElement} = useToggle()

const saveRedactedNode = ()=>{
    if(props.node.name)
    emit('saveCategory',props.node)    
    props.node.edit = false
}
</script>
<style scoped lang="scss">
h3{
    cursor: pointer;
}

.title:hover{
    color: lightskyblue;
    fill: lightskyblue;
}

.icon{
        cursor: pointer;
    height: 1rem;
    width: auto;
}
.forward_arrow{
    transform: rotate(0deg);
    transition: transform .2s ease-in-out;
}
.down_arrow{
    transform: rotate(90deg);
    transition: transform .2s ease-in-out;
}
li{
    padding: 0 1.5rem;
}
ul{
    list-style-type: none;
}


.title{
    display: grid;
    width: fit-content;
    grid-auto-flow: column;
    align-items: center;
    gap:.4rem;

}
.item{
color: gray;
}
.item:hover{
    cursor: pointer;
    color: black;
}
@import '../../../assets/row_actions.scss';
@import '../../../assets/show-animation.css';
@import '../../../assets/inline_input.scss';
@import '../../../assets/no_select.scss';

</style>