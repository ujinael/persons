<template>
<div class="page">
    <VPersonPageComponent></VPersonPageComponent>
    <VContactPageComponent/>
    <VTabPageComponent id="tabs" :tabs-array="['passports','addresses']"/>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClientsStore } from '../../stores/modules/clients/useClientsStore';
import VPersonPageComponent from '../employers/components/VPersonPageComponent.vue';
import VContactPageComponent from '../employers/components/VContactPageComponent.vue';
import VTabPageComponent from '../employers/components/tabs/VTabPageComponent.vue';
import { usePassportsStore } from '../../stores/modules/passports/usePassportsStore';
import { usePersonsStore } from '../../stores/modules';
import { useAddressesStore } from '../../stores/modules/addresses/useAddressesStore';
const store = useClientsStore()
const {client} = storeToRefs(store)
const personStore = usePersonsStore()
const {person} = storeToRefs(personStore)
const passportsStore = usePassportsStore()
const addressStore = useAddressesStore()
const route = useRoute()
onMounted(()=>{
    const id = route.params.id
    if(typeof id == 'string')
store.fetchOneClient(id).then(()=>{
 store.setPersonToPersonStore() 
if(person.value && person.value.id){
    passportsStore.fetchPassport(person.value.id)
addressStore.fetchAddress(person.value.id)
}
})
})
</script>
<style scoped lang="scss">
.page{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 1rem;
}
#tabs{
    grid-area: 2/1/3/4;
}
</style>