<template>
<form @submit.prevent="saveAddress" v-if="address">
 <label for="#type">тип:
 <VSelect id="type" v-model="address.type"
 :options="types.map(t=>({title:t.title,value:t}))"
 :label="address.type?.title"
 /></label>   
 <label for="#country">страна:
 <VInput id="country" v-model="address.country"/>
</label>
 <label for="#region">область/край:
 <VInput id="region" v-model="address.region"/>
</label>
 <label for="#city">город:
 <VInput id="city" v-model="address.city"/>
</label>
 <label for="#district">район:
 <VInput id="district" v-model="address.district"/>
</label>
 <label for="#street">улица:
 <VInput id="street" v-model="address.street"/>
</label>
 <label for="#house">дом:
 <VInput id="house" v-model="address.house"/>
</label>
 <label for="#corpus">корпус:
 <VInput id="corpus" v-model="address.corpus"/>
 </label>
  <label for="#flat">квартира:
 <VInput id="flat" v-model="address.flat"/>
 </label>
  <label for="#registrationDate">дата регистрации:
 <VInput type="date" id="registrationDate" v-model="address.registrationDate"/>
 </label>
 <label for="#postIndex">почтовый индекс:
 <VInput id="postIndex" v-model="address.postIndex"/>
 </label>
 <div class="actions">
    <VButton type="submit" rounded>Сохранить</VButton>
    <VButton @click="emit('close')" plain :vStyle="'cancel'" rounded>Отмена</VButton>
 </div>
</form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import VSelect from '../ui-components/VSelect.vue';
import VInput from '../ui-components/VInput.vue';
import VButton from '../ui-components/VButton.vue';
import { useAddressesStore } from '../../stores/modules/addresses/useAddressesStore';
const props = defineProps<{
    personID:string
}>()

const emit = defineEmits(['close'])
const store = useAddressesStore()
const  {address,types} = storeToRefs(store)
const saveAddress = ()=>{
if(address.value){
if(address.value.id) {

}   
else {
store.saveAddress(props.personID)
.then(()=>{
    emit('close')
})    
}
}
}
onMounted(()=>{
store.fetchTypes() 
})
</script>
<style scoped lang="scss">
@import '../../assets/form.css';
form{
    width: 550px;
    grid-template-columns: repeat(2,1fr);
}
.actions{
    display: flex;
    grid-column: 1/3;
}
</style>