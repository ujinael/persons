<template>
    <div class="time_cell" 
:class="cell.class"
ref="timecell"
  >
  <!-- :style="{gridRowStart:cell.style.gridRowStart,gridRowEnd:cell.style.gridRowEnd}" -->

{{`${timeFromDate(cell.start)}-${timeFromDate(cell.end)}`}}
</div>
</template>

<script lang="ts" setup>
import { useDateUtils } from '../../../composition';
import {TimeCell} from '../../../stores/models/'
const props = defineProps<{
    cell:TimeCell
}>()
const {timeFromDate} = useDateUtils()

</script>

<style lang="scss" scoped>

.time_cell{
color:dimgray;
line-height:var(--timeCellHeight);
font-size:var(--timeCellFontSize);
height: 30px;
user-select: none;
box-sizing: border-box;
border-bottom: 1px solid lightgray;
}
.time_cell:hover{
    cursor: pointer;
}
.time{
 background-color: whitesmoke;
}
.working{
    background: white;
}
.working:hover{
background-color:rgb(243, 243, 243);

}
</style>