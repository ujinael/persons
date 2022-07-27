<template>
<div class="content">
<span class="type">тип: {{address.type?.title}}</span>
<span class="country">страна: {{address.country}}</span>
<span class="region">область/край: {{address.region}}</span>
<span class="city">город: {{address.city}}</span>
<span class="district">район: {{address.district}} </span>
<span class="street">улица: {{`${address.street}`}}</span>
<span class="house">дом: {{address.house}}</span>
<span class="corpus">корпус: {{`${address.corpus}`}}</span>
<span class="flat">квартира: {{address.flat}}</span>
<span class="registrationDate">дата регистрации: {{`${address.registrationDate.split('T')[0]}`}}</span>
<span class="postIndex">почтовый индекс: {{address.postIndex}}</span>

</div>
</template>
<script setup lang="ts">
import { Address } from '../../../stores/models/address/Address';

const props = defineProps<{
    address:Address
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
.country {
}
.region {
}
.city {
}
.district {
}
.street {
}
.house {
}
.corpus {
}
.flat {
}
.registrationDate {
}
.postIndex {
}
</style>