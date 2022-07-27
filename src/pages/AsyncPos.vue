<template>
 <!-- <Suspense> -->
    <ul>
   

    <li v-for="position,index in positions " :key="index">
        {{position}}
    </li>
</ul>
<!-- </Suspense> -->
</template>
<script setup lang="ts">
const positions = await fetch('http://localhost:5000/clients').then((r) => r.json())

</script>
<style scoped lang="scss">

</style>