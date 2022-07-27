<template>
<div class="content">
<span class="type">паспорт: {{passport.type?.title}}</span>
<span class="seria">серия: {{passport.seria}}</span>
<span class="number">номер: {{passport.number}}</span>
<span class="code">код подразделения: {{passport.code}}</span>
<span class="department">кем выдан: {{passport.department}} </span>
<span class="date_of_issue">дата выдачи: {{`${passport.dateOfIssue.split('T')[0]}`}}</span>
<span class="born_place">место рождения: {{passport.bornPlace}}</span>

</div>
</template>
<script setup lang="ts">
import { Passport } from '../../../stores/models/passport/Passport';

const props = defineProps<{
    passport:Passport
}>()
</script>
<style scoped lang="scss">
.content{
    display: grid;
    justify-items: left;
    gap:0 1rem ;
    box-shadow: var(--common_shadows);
    padding: .5rem;
    box-sizing: border-box;
grid-template-columns: repeat(3,max-content);
}
span{
    // font-size: small;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.type {
    grid-area: 1/1/2/2;

}
.seria {
    grid-area: 1/2/2/3;
}
.number {
        grid-area: 1/3/2/4;

}
.code {
grid-area: 2/1/3/4;
}
.department {
grid-area: 3/1/4/4;

}
.date_of_issue {
    grid-area: 4/1/5/4;
}
.born_place {
        grid-area: 5/1/6/4;
}
</style>