<template>
<div class="page">
<VNomenclatureListPageComponent/>
<VNomenclatureDetailPageComponent/>
</div>

</template>
<script setup lang="ts">
import VNomenclatureListPageComponent from './VNomenclatureListPageComponent.vue'
import VNomenclatureDetailPageComponent from './VNomenclatureDetailPageComponent.vue'

</script>
<style scoped lang="scss">
.page{
   display: grid;
   grid-template-columns: 35% 1fr;
   grid-template-rows:calc( 100vh - 80px);
   gap:1rem;
}
</style>