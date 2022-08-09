<template>
<VRequestCard>
<div class="card_content">
      <h5>
{{item.employerPosition?.employerTitle}}
</h5>  
<!-- <div class="position"> -->
    <sup>
            {{item.employerPosition?.position?.title}}

    </sup>
<!-- </div> -->
<div class="times">
<span>{{useDateFormat(item.start,'HH:mm').value}}</span>
-
<span>{{useDateFormat(item.end,'HH:mm').value}}</span>
</div>

</div>
</VRequestCard>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { SchedulleEvent } from '../../../stores/models/schedulle_event/schedulle_event';
import VRequestCard from './VRequestCard.vue'
const props = defineProps<{
    item:SchedulleEvent
}>()

</script>
<style scoped lang="scss">
.card_content{
    width: 7rem;
    height: 100%;
    display: grid;
    box-sizing: border-box;
padding: .2rem;
align-content:space-between ;
}

.times{
font-size: small;
}
</style>