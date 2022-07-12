<template>
<div class="page_component">
<div class="header">
  <h3 v-if="label">
     {{label}}
  </h3> 
<div class="buttons">
<slot name="buttons"></slot>
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
}>()
</script>
<style scoped lang="scss">
@import '../../assets/page-component.scss';
.page_component{
width: fit-content;
height: fit-content;
}

h3{
     grid-column: 2/3;
}
.buttons{ justify-self: right;
grid-column: 3/4;
display: flex;
gap:.5rem;
}

</style>