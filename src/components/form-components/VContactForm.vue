<template>
<form @submit.prevent="emit('save')">

  <label>
    телефон
     <VInput v-phonemask
      v-model="value.value" :type="'tel'"/>
  </label> 
  <label>
<VSelect 
v-model="value.type"
:options="Object.values(PhoneType)"
/>
  </label>
    <VButton type="submit">Сохранить</VButton>
</form>
</template>
<script setup lang="ts">
// import {VPhonemask} from '../../directives/VPhonemask.ts'
import VInput from '../ui-components/VInput.vue';
import VButton from '../ui-components/VButton.vue';
import VSelect from '../ui-components/VSelect.vue';
import { Phone, PhoneType } from '../../stores/models';
import { computed } from 'vue';
// import VPhonemask from '../../directives/VPhonemask';
// const vPhonemask = VPhonemask
const props = defineProps<{
modelValue:Phone
}>()
const emit = defineEmits(['save','update:modelValue'])
const value = computed<Phone>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
</script>
<style scoped lang="scss">
@import '../../assets/form.css'
</style>