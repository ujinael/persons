<template>
<div class="page">
<VPersonPageComponent id="person"/>
<VAccountPageComponent id="account"/>
<VContactPageComponent v-if="store.employer.person" id="contacts"/>
<VTabPageComponent id="tabs"/>
</div>
</template>
<script setup lang="ts">
import VPersonPageComponent from './components/VPersonPageComponent.vue';
import VAccountPageComponent from './components/VAccountPageComponent.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useEmployersStore,useAccountsStore } from '../../stores/modules';
import VContactPageComponent from './components/VContactPageComponent.vue';
import VTabPageComponent from './components/tabs/VTabPageComponent.vue';
const route = useRoute()
const store = useEmployersStore()
const accountStore = useAccountsStore()

onMounted(()=>{
    const id:string =  `${route.params.id}`
    if(id)
store.fetchUser(id).then(()=>{
    if (store.employer.accountID)accountStore.fetchAccount(store.employer.accountID)

})
})
</script>
<style scoped lang="scss">
.page{
display: grid;
gap: 1rem;
grid-template-columns: min-content min-content;
// grid-template-rows: min-content min-content;
// align-items: center;
}
#person{
// grid-area: 1/1/3/2;
grid-column: 1/2;
grid-row: 1/3;
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