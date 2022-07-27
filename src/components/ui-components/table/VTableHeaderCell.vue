<template>
  <th>
    <div class="content">
      <div class="label">
        <slot> </slot>
      </div>

      <div class="sort_buttons" v-if="sortable">
        <ul>
          <li>
            <span :class="{ active: sortDirection === 'asc' }" @click="asc"
              >&triangle;</span
            >
          </li>
          <li>
            <span
              :class="{ active: sortDirection === 'desc' }"
              @click="desc"
              class="down"
              >&triangle;</span
            >
          </li>
        </ul>
      </div>
    </div>
  </th>
</template>
<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';

const props = defineProps<{
  sortable?: boolean;
  modelValue?: 'asc' | 'desc';
}>();
const sortDirection = ref<'asc' | 'desc'| undefined>('asc');
const value = computed<'asc' | 'desc' | undefined>({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit('update:modelValue', v);
  },
});
const emit = defineEmits(['onAsc', 'onDesc', 'noSort', 'update:modelValue']);
const asc = () => {
  if (sortDirection.value !== 'asc') {
    sortDirection.value = 'asc';
    value.value = 'asc';
    emit('onAsc');
  }
  else{
    sortDirection.value = undefined;
    value.value = undefined;
    emit('noSort')


  }
};
const desc = () => {
  if (sortDirection.value !== 'desc') {
    sortDirection.value = 'desc';
    value.value = 'desc';
    emit('onDesc');
  }
   else{
    sortDirection.value = undefined;
    value.value = undefined;
    emit('noSort')
  }
};
</script>
<style scoped lang="scss">
.content {
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
ul {
  list-style: none;
  cursor: pointer;
}
span {
  font-weight: bolder;
  font-size: large;
  line-height: 16px;
  color: gray;
  transition: all 0.2s ease-in-out;
}

span:hover {
  transition: all 0.2s ease-in-out;
  color: black;
  filter: drop-shadow(0px 1px 4px gray);
}
span:active {
  color: gray;
}
.active {
  color: black;
}
.down {
  display: block;
  transform: rotate(-180deg);
  // text-orientation:sideways;
}
</style>
