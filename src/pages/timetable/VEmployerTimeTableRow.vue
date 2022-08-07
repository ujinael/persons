<template>
  <tr @mousedown.stop="onMouseDown">
    <td class="row_title">
      <div class="row_title_content">
         <h4 class="title">
        {{ item.employerPosition?.employerTitle}}
      </h4>
     
        <cite class="subtitle">
                  {{ item.employerPosition?.position?.title }}

        </cite>
     <div class="action">
       <VButton
        vStyle="accept"
        @click="emit('onSave', item)"
        icon="save"
        rounded
      />
     </div>
      </div>
    </td>
  
    <VTimeTableCell
    @dblclick="emit('showContext',{day:day,ev:$event})"
      v-for="(day, i) in item.days"
      :key="i"
      ref="itemRefs"
      :item="day"
    />
  </tr>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useOverLap } from '../../composition/useOverlap.js';
import { EmployerSchedulle } from '../../stores/models/employer_schedulle/EmployerSchedulle.js';
import { DaySchedulle, Status } from '../../stores/models/index.js';
import { useSchedullePresetsStore } from '../../stores/modules/schedulle_presets/useSchedullePresetsStore.js';
import VTimeTableCell from './VTimeTableCell.vue';
import VButton from '../../components/ui-components/VButton.vue';
import { useMonthSchedullesStore } from '../../stores/modules/month_schedulles/useMonthSchedullesStore.js';

const props = defineProps<{
  item: EmployerSchedulle;
}>();
const emit = defineEmits<{
  (event: 'onSave', item: EmployerSchedulle): void;
    (event: 'showContext', item:{day:DaySchedulle,ev:MouseEvent} ): void;

}>();
const presetsStore = useSchedullePresetsStore();
const monthStore = useMonthSchedullesStore()
const {monthSchedulle} = storeToRefs(monthStore)
const { preset } = storeToRefs(presetsStore);
const { selectionOverlap } = useOverLap();
const itemRefs = ref<InstanceType<typeof VTimeTableCell>[]>([]);
const selectedDays = ref<DaySchedulle[]>([]);
const onSelectionEnd = () => {  
  if (preset.value && monthSchedulle.value) {
    selectedDays.value.forEach((d) => {
      d.start = preset.value!.start;
  d.start = new Date(d.start.setFullYear(monthSchedulle.value!.year,monthSchedulle.value!.month-1,d.dayNumber))
  d.end = preset.value!.end;
    d.end = new Date(d.end.setFullYear(monthSchedulle.value!.year,monthSchedulle.value!.month-1,d.dayNumber))
      d.color = preset.value!.color;
      d.status = preset.value!.status;
      d.selected = false;
    });
    console.log(selectedDays.value);
    
  } else {
    throw new Error('Выберите временной пресет');
  }
};

const setSelectionDays = (sel: Selection) => {
  itemRefs.value.forEach((e) => {
    if (selectionOverlap(sel, e.$el)) {
      e.item.selected = true;
    } else {
      e.item.selected = false;
    }
  });
    selectedDays.value = props.item.days.filter((d) => d.selected);
};
interface Selection {
  start: number;
  end: number;
}
const selection = ref<Selection | null>(null);
const selectionMode = ref(false);
const onMouseDown = (ev: MouseEvent) => {  
  if (preset.value) {
    selectionMode.value = true;
    selection.value = { start: ev.clientX, end: ev.clientX };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  }
};
const onMouseUp = (ev: MouseEvent) => {

  selection.value = null;
  selectionMode.value = false;
  onSelectionEnd()
  selectedDays.value = []
 document.removeEventListener('mousemove', onMouseMove);   
 document.removeEventListener('mouseup', onMouseUp);

};
const onMouseMove = (ev: MouseEvent) => {
  let direction: 'forward' | 'backward';
  if (selection.value) {
    if (selection.value.start >= ev.clientX - 5) direction = 'backward';
    else direction = 'forward';

    if (direction === 'forward') {
      selection.value.end = ev.clientX;
    } else {
      selection.value.start = ev.clientX;
    }
    setSelectionDays(selection.value);
  }
};
</script>
<style scoped lang="scss">
@import '../../assets/page-component.scss';
@import '../../assets/selection-rectangle.scss';


.selectable {
  position: relative;
}
td {
  user-select: none;
}
td:hover {
  cursor: pointer;
  transition: background-color 0.2s ease-in;
}
.actions {
  padding: 0.4rem;
  // border-right: 1px solid gray;
}
.row_title {
  padding: 0.4rem;
  position: sticky;
  left: 0px;
}
.row_title_content{
gap: 0 .5rem;
width: 12rem;
height: 4.5rem;
box-sizing: border-box;
padding: .5rem;
box-shadow: var(--common_shadows);
border-radius: var(--common_border_radius);
display: grid;
grid-auto-flow: column;
justify-items: left;
  background-color: whitesmoke;
  // align-items:baseline;
align-content: flex-start;
}
.title{
  grid-area: 1/1/2/2;
}
.subtitle{
  font-size: small;
grid-area: 2/1/3/2;
text-align: left;
}
.action{
  justify-self: right;
      grid-area: 1/2/2/3;
}
</style>
