<template>
    <div class="tab_bar" :class="classes" >
        <slot>

        </slot>
    </div>
</template>

<script lang="ts">

export default {
    name: 'VTabBar',
}
</script>
<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps<{
direction?:"vertical"|"horizontal"  
align?:"start"|"end"  
}>()
const classes = computed(()=>
  {
return {
vertical:props.direction == 'vertical',
horizontal:props.direction == 'horizontal'|| props.direction == undefined,
start:props.align == 'start',
end:props.align == 'end'
}
})
</script>

<style lang="scss" scoped>
.tab_bar{
    display: grid;
    gap:.4rem;
    cursor:default;
}
.start{
    justify-content: flex-start;

}
.end{
    justify-content: flex-end;
}
.vertical{
grid-auto-flow: row;
// grid-template-rows: repeat(auto-fill,min-content);    
}
.horizontal{
grid-auto-flow: column;
// grid-auto-columns: auto;
// grid-template-rows: auto;
// grid-template-columns: repeat(7,1fr);    

}
</style>