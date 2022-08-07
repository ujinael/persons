<template>
  <div
    class="selection_rectangle"
    v-selectable-area="{ show: onShow, resizing: onResize, hide: onHide }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['show', 'resize', 'hide']);
const onShow = (el: HTMLDivElement) => {
  emit('show', el);
};
const onResize = (el: HTMLDivElement) => {
  emit('resize', el);
};
const onHide = (el: HTMLDivElement) => {
  emit('hide', el);
};
</script>
<style scoped lang="scss">
.selection_rectangle {
  position: absolute;
  top: 0;
  left: 0;
}
@import '../../assets/selection-rectangle.scss';
</style>
