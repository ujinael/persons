<template>
<div class="layout">
    <router-view></router-view>
</div>
</template>
<script lang="ts">
export default {
    name:'login-layout'
}
</script>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.layout{
    background-color: gray;
    height: 100vh;
    width: 100vw;
}
</style>