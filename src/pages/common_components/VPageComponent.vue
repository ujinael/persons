<template>
<div class="page_component" :style="{width}">
<div class="header">
  <div class="lbuttons">
<slot name="lbuttons"></slot>
</div>
  <h3 v-if="label">
     {{label}}
  </h3> 
<div class="rbuttons">
<slot name="rbuttons"></slot>
</div>
</div>
<div class="main">
      <slot></slot>
</div>
  
</div>
</template>
<script setup lang="ts">
const props = defineProps<{
label?:string
width?:string
}>()
</script>
<style scoped lang="scss">
@import '../../assets/page-component.scss';
.page_component{
// width: fit-content;
// height: fit-content;
}

h3{
     grid-column: 2/3;
}
.lbuttons{ 
justify-self: left;
display: flex;
grid-column: 1/2;
gap:.5rem;
}
.rbuttons{ 
justify-self: right;
display: flex;
grid-column: 3/4;
gap:.5rem;
}

</style>