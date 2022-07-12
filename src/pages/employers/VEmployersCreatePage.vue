<template>
<div class="page">
 
    <div class="page_component">
        <div class="header">
            <h3>Пользователи</h3>
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
                @click="store.createNewEmployer"><PersonAddIco /></VButton>
            </th>
        </thead>
         <VLoader v-if="store.loading"/>
        <tbody v-else>  
           
            <tr
            @dblclick="detail(item.id)"
            v-for="(item, index) in employers" 
            :key="index"
            >
<td align="center" width="40px">{{index + 1}}</td>
<td align="left" width="300px">{{item.person?`${item.person.surname} ${item.person.name} ${item.person.patronymic}`:'новый сотрудник'}}</td>
<td>{{item.person ? date(item.person.dateOfBirth) :'не заполнено'}}</td>
<td>{{item.person?item.person.gender==='male'?'мужчина':'женщина':'не заполнено'}}</td>
<td>
    <VPhone v-if="item.person && item.person.defaultPhone" :phone="item.person.defaultPhone"/>
   <span v-else>нет</span>
   </td>
<td><div class="account_col">
{{item.accountID ? 'есть':'нет'}}
</div></td>
<td><VButton rounded :vStyle="'accept'"
@click="detail(item.id)"
><EditIco /></VButton></td>
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
import {useDateUtils} from '../../composition/useDateUtils';
import PersonAddIco from '../../assets/person-add.svg'
import EditIco from '../../assets/edit.svg'
import VButton from '../../components/ui-components/VButton.vue';
import { useRouter } from 'vue-router';
import VLoader from '../../components/ui-components/VLoader.vue';
import VPhone from '../../components/ui-components/VPhone.vue';
const {date} = useDateUtils()
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
    margin: .8rem;
    padding-bottom: .5rem;
}

</style>