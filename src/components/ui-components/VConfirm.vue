<template>
  <VModal title="Подтверждение" v-model="value">
  <div class="content">
     <slot>
      <div v-if="condition" class="condition">
        {{ condition }}
      </div>
    </slot>

    <div class="actions">
      <VButton @click="onConfirm" vStyle="accept" rounded>Подтвердить</VButton>
      <VButton @click="onCancel" vStyle="cancel" rounded>Отмена</VButton>
    </div>
  </div>
   
  </VModal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import VModal from '../VModal.vue';
import VButton from './VButton.vue';
const props = defineProps<{
  modelValue: boolean;
  condition?: string;
}>();
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);
const value = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit('update:modelValue', v);
  },
});
const onConfirm = () => {
  emit('confirm');
  value.value = false;
};
const onCancel = () => {
  emit('cancel');
  value.value = false;
};
</script>
<style scoped lang="scss">
.content{
    max-width: 20rem;
    display: grid;
    gap: .5rem;
    justify-items: center;
}
.actions{
    display: flex;
    gap:1rem;
}
</style>
