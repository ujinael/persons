<template>
<div class="request_card">
    <slot>

    </slot>
</div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.request_card{
     border-radius: var(--common_border_radius);
    background-clip: border-box;
    box-sizing:border-box;
    background-color: white; 
    height: 5rem;
    box-shadow: var(--common_shadows);
    width: fit-content;
}
</style>