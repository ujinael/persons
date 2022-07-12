<template>
<form @submit.prevent="emit('save')">
    <label>Логин
        <VInput v-model="account.login"/>
    </label>
      <label>Пароль
        <VInput v-model="account.password"/>
    </label>
    <VSelect 
    :options="roles.map(r=>{return {title:r.description,value:r}})"
    :label="account.roles[0].description"
     v-model="account.roles[0]"/>
    <div class="submit_btn">
        <VButton rounded vStyle="accept">Сохранить</VButton>
    </div>
</form>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Account } from '../../stores/models';
import VInput from '../ui-components/VInput.vue'
import VButton from '../ui-components/VButton.vue';
import VSelect from '../ui-components/VSelect.vue';
import { storeToRefs } from 'pinia';
import { useRolesStore } from '../../stores/modules/roles/useRolesStore';
const props = defineProps<{
modelValue:boolean
accountValue:Account
}>()
const emit = defineEmits(['update:modelValue','update:accountValue','save'])
const value = computed<boolean>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
const account = computed<Account>({
get(){return props.accountValue},
set(v){emit('update:accountValue',v)}
})
 const store = useRolesStore()
const {roles} = storeToRefs(store)
onMounted(()=>{
    store.fetchRoles()
})
</script>
<style scoped lang="scss">
form{
width:450px;
}
@import '../../assets/form.css';
</style>