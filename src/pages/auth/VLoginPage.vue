<template>
<div class="page">
    <div class="content">
            <VLoginForm
            @onAcces="redirect"
            v-model="show"/>

    </div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VLoginForm from '../../components/form-components/VLoginForm.vue';
const router = useRouter()

const show = ref(false)
const redirect = ()=>{
    console.log('succes auth');
    
router.push('/employers')
}
</script>
<style scoped lang="scss">
.page{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
.content{
    display:flex;
    flex-direction: column;
    justify-content: center;
}
</style>