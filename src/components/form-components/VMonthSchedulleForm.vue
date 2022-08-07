<template>
  <form @submit.prevent="onSave" v-if="monthSchedulle">
    <label>месяц: <input v-model="monthSchedulle.month" /></label>

    <label>год: <input v-model="monthSchedulle.year" /></label>

    <div class="actions">
      <VButton rounded vStyle="accept" type="submit">Сохранить</VButton>

      <VButton rounded vStyle="cancel" @click.prevent="emit('close')"
        >Отмена</VButton
      >
    </div>
  </form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMonthSchedullesStore } from '../../stores/modules/month_schedulles/useMonthSchedullesStore.js';
import VButton from '../ui-components/VButton.vue';
const emit = defineEmits(['close']);
const store = useMonthSchedullesStore();
const { monthSchedulle } = storeToRefs(store);
const onSave = () => {
  if (!monthSchedulle.value?.id) {
    store.saveMonthSchedulle().then(() => {
      emit('close');
    });
  }
};
</script>
<style scoped lang="scss">
@import '../../assets/inline_input.scss';
@import '../../assets/form.css';
form {
  width: 300px;
}
label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: gray;
}
</style>
