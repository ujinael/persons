<template>
<div class="header">
   <div class="account_info h_element" >
{{`Пользователь: ${authorizedAccount?.login}`}}
   </div>
   <div class="logout_btn h_element" @click="store.logout()">
<LogoutIco class="logout_ico"/>
   </div>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import LogoutIco from '../../assets/exit.svg'
import { useAuthStore } from '../../stores/modules';
const store = useAuthStore()
const {authorizedAccount} = storeToRefs(store)
</script>
<style scoped lang="scss">
.header{
display: flex;
justify-content: space-between;
padding:0 1rem;
}
.h_element{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.logout_btn{
    height: fit-content;
    width: auto;
}
.logout_ico{
    stroke:1px white;
}
.logout_ico:hover{
    cursor: pointer;
        stroke: black;

    transition: all .2s ease-in-out;
}
</style>