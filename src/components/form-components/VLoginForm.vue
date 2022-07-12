<template>
<form @submit.prevent="loginSubmit">
<label>
<VInput placeholder="Логин" v-model="login.login"/>
</label>
<label>
<VInput placeholder="Пароль" v-model="login.password"/>
</label>
<div class="submit">
    <VButton type="submit">Войти</VButton>
</div>
</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/modules';
import VInput from '../ui-components/VInput.vue';
import VButton from '../ui-components/VButton.vue';
const props = defineProps<{
modelValue:boolean
}>()
const emit = defineEmits(['update:modelValue','onAcces'])
const value = computed<boolean>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})
onMounted(()=>{
    login.value.login = 'test4@test.ru'
    login.value.password = '123456'
})

const store = useAuthStore()
const {login} = storeToRefs(store)
const loginSubmit = ()=>{
store.loginSubmit().then(()=>{
emit('onAcces')
})
}

</script>
<style scoped lang="scss">
form{
    width: 400px;
}
@import '../../assets/form.css';
</style>