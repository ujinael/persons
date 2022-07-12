<template>
<div ref="element" class="component resizable">
    <h1>True Resizing</h1>
</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const element = ref<HTMLDivElement|undefined>(undefined)
const observer = new MutationObserver(function(mutations) {
//   console.log('mutations:', mutations);
// if(element.value)
        //   console.log(element.value.clientHeight);

});
onMounted(()=>{
    if( element.value){
        // console.log(element.value.clientHeight);
        
            observer.observe(element.value,{
                
                attributes:true})

    }
})
</script>
<style scoped lang="scss">
.component{
    border: 1px solid blue;
        box-sizing: border-box;
    width: 10rem;
    height: 2rem;
    background-color: whitesmoke;
}
.resizable{
    resize:vertical;
overflow: hidden;
}
</style>