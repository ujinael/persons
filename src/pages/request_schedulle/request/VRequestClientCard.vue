<template>
<VRequestCard>
<div class="card_content">
    <section v-if="item">
      <h4>

</h4>  
    </section>
<section v-else >
<div class="add_item">
    <div class="plus">
        &plus;  
    </div>
  
</div>
</section>

</div>
</VRequestCard>
</template>
<script setup lang="ts">
import { Client } from '../../../stores/models/client/Client';
import VRequestCard from './VRequestCard.vue'
const props = defineProps<{
    item?:Client
}>()
</script>
<style scoped lang="scss">
.card_content{
    width: 7rem;
    height: 100%;
        display: grid;
        box-sizing: border-box;
padding: .2rem;
}
.add_item{
    display: grid;
    justify-items: center;
    align-items: center;
   height: 100%;
}
.plus{
     font-size: xx-large;
    //  line-height: 20px;
}
</style>