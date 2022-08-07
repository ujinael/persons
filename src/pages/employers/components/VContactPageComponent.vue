<template>

<VPageComponent label="Контакты">
    <template #rbuttons>
     <VButton
     @click="toggleForm"
         :vStyle="'accept'" 
         icon="edit" rounded/>
    </template>
    <VModal v-model="showForm">
<VContactForm v-model="phone"
@save="save"
/>
</VModal>
<ul v-if="phones.length">
<li v-for="(item, index) in phones"
:class="{primary:item.id === person?.defaultPhone?.id}"
:key="index">
   <VPhone :phone="item"/> 
   <span v-if="item.id === person?.defaultPhone?.id">основной</span>
<VButton @click="phoneStore.removePhone(item.id!)"
 :vStyle="'delete'" rounded :icon="'delete'"/>
</li>
</ul>
   <div v-else class="alt">
У пользователя нет контактов. 
<strong @click="toggleElement">Создать+</strong> 
</div>
</VPageComponent>
</template>
<script setup lang="ts">
import { usePersonsStore } from '../../../stores/modules';
import VPageComponent from '../../common_components/VPageComponent.vue';
import VPhone from '../../../components/ui-components/VPhone.vue';
import { storeToRefs } from 'pinia';
import VButton from '../../../components/ui-components/VButton.vue';
import VModal from '../../../components/VModal.vue';
import { useToggle } from '../../../composition';
import VContactForm from '../../../components/form-components/VContactForm.vue';
import { usePhonesStore } from '../../../stores/modules/phones/usePhonesStore';
import { Phone, PhoneType } from '../../../stores/models';
import { onMounted } from 'vue';
const store = usePersonsStore()
const  {person} = storeToRefs(store)
const phoneStore = usePhonesStore()
const {phone,phones} = storeToRefs(phoneStore)
onMounted(()=>{
    setTimeout(()=>{
  if(person.value)
    phoneStore.fetchPhonesByPersonID(person.value.id!)
    },500)
  
})

const  {elementVisible:showForm,toggleElement} = useToggle()
const toggleForm = (id?:string)=>{
if(id === undefined){
phone.value = phones.value.find(p=>p.id! === id)!
}
else{
    phone.value = new Phone('',PhoneType.MOBILE)  
}
toggleElement()
}
const save = ()=>{
    if(!phone.value.id){
     phoneStore.savePhone(person.value?.id!)   
    }
    else{
             phoneStore.updatePhone(person.value?.id!)   
    }

}
</script>
<style scoped lang="scss">
ul{
    list-style: none;
    // width: 300px;
}
li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    padding: .2rem 0;
}
.primary{
    font-weight: bold;
}
strong{
    text-decoration: underline;
    color: blue;
}
strong:hover{
    cursor: pointer;
    color: violet;
}
</style>