<template>
<div class="page">
 
    <div class="page_component">
        <div class="header">
            <div></div>
            <h3>Пользователи</h3>
                        <div></div>
        </div>
         <table> 
        <thead>
            <th >№</th>
            <th>Фамилия Имя Отчество</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Телефон</th>
            <th>Аккаунт</th>
            <th>
                <VButton rounded
                @click="store.createNewEmployer" icon="add_person" ></VButton>
            </th>
        </thead>
         <VLoader v-if="store.loading"/>
        <tbody v-else>  
           
            <tr
            @dblclick="detail(item.id)"
            v-for="(item, index) in employers" 
            :key="index"
            >
<VTableCell align="center" width="40px">{{index + 1}}</VTableCell>
<VTableCell align="left" width="300px">{{item.person?`${item.person.surname} ${item.person.name} ${item.person.patronymic}`:'новый сотрудник'}}</VTableCell>
<VTableCell>{{item.person ? `${useDateFormat(item.person.dateOfBirth,'YYYY-MM-DD').value}` :'не заполнено'}}</VTableCell>
<VTableCell>{{item.person?item.person.gender==='male'?'мужчина':'женщина':'не заполнено'}}</VTableCell>
<VTableCell>
    <VPhone v-if="item.person && item.person.defaultPhone" :phone="item.person.defaultPhone"/>
   <span v-else>нет</span>
   </VTableCell>
<VTableCell><div class="account_col">
{{item.accountID ? 'есть':'нет'}}
</div></VTableCell>
<VTableCell><VButton rounded :vStyle="'accept'"
@click="detail(item.id)" icon="edit"
/></VTableCell>
            </tr>
        </tbody>
    </table> 
    </div>
  
   <!-- </VPageComponent> -->
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { useEmployersStore } from '../../stores/modules';
import VButton from '../../components/ui-components/VButton.vue';
import { useRouter } from 'vue-router';
import VLoader from '../../components/ui-components/VLoader.vue';
import VPhone from '../../components/ui-components/VPhone.vue';
import {  useDateFormat } from '@vueuse/core'
import VTableCell from '../../components/ui-components/table/VTableCell.vue';

const store = useEmployersStore()
const {employers,employer} = storeToRefs(store)
const creationMode = ref(false)
const router = useRouter()
const detail = (id?:string)=>{
if(id){
    router.push(`/employers/${id}`)

}
}
onMounted(()=>{
    store.fetchUsers()
})
onUnmounted(()=>{
    store.$reset()
})
</script>
<style scoped lang="scss">

.page{
    height: 600px;
    width: auto;
    overflow: scroll;
}
@import '../../assets/page-component.scss';
@import '../../assets/table.css';
.page_component {
    margin: .4rem;
    // padding-bottom: .5rem;
}

</style>