<template>
<fieldset class="client">
<legend class="first">Клиент</legend>

<div class="cards client">
    <VRequestClientCard/>
</div>
</fieldset>
</template>
<script setup lang="ts">
import VRequestClientCard from './VRequestClientCard.vue'
</script>
<style scoped lang="scss">
@import '../../../assets/request_component.scss';
</style>