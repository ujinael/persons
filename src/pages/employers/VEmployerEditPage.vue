<template>
<div class="page">
<VPersonPageComponent id="person"/>
<VAccountPageComponent id="account"/>
<VContactPageComponent v-if="store.employer.person" id="contacts"/>
<VTabPageComponent :tabs-array="['positions','passports','addresses','docs']" id="tabs"/>
</div>
</template>
<script setup lang="ts">
import VPersonPageComponent from './components/VPersonPageComponent.vue';
import VAccountPageComponent from './components/VAccountPageComponent.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useEmployersStore,useAccountsStore, usePersonsStore } from '../../stores/modules';
import VContactPageComponent from './components/VContactPageComponent.vue';
import VTabPageComponent from './components/tabs/VTabPageComponent.vue';
import { storeToRefs } from 'pinia';
import { usePassportsStore } from '../../stores/modules/passports/usePassportsStore';
import { useAddressesStore } from '../../stores/modules/addresses/useAddressesStore';
const route = useRoute()
const store = useEmployersStore()
const {employer} = storeToRefs(store)
const accountStore = useAccountsStore()
const personStore = usePersonsStore()
const {person} = storeToRefs(personStore)
const passportsStore = usePassportsStore()
const addressStore = useAddressesStore()
onMounted(()=>{
    const id = route.params.id
    if(typeof id == 'string')
store.fetchUser(id).then(()=>{
 store.setPersonToPersonStore() 
 accountStore.fetchAccount(employer.value.accountID!)
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
gap: 1rem;
grid-template-columns:repeat(3,1fr);
grid-template-rows: 200px 1fr;
// align-items: center;
}
#person{
// grid-area: 1/1/3/2;
grid-column: 1/2;
grid-row: 1/2;
}
#account{
// grid-area: 1/2/2/3;
grid-column: 2/3;
grid-row: 1/2;
}
#contacts{
grid-column: 3/4;
grid-row: 1/2;
// grid-area: 2/2/3/3;
}
#tabs{
 grid-area: 3/1/4/4;   
}
</style>