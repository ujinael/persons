<template>


<VPageComponent label="Информация">
    <template #rbuttons>
        <VButton :vStyle = "'accept'" 
        @click="openForm"
        rounded icon="edit"/>
    </template>
    <VModal v-model="showForm">
  <VPersonCreateForm
  @save="updatePerson"
v-model="showForm"
:person-value="person"/>  
</VModal>
    <div class="content">
        <div class="avatar">
            <img src="@/assets/default.jpeg" alt="врач">
        </div>
        <VLoader v-if="store.loading"/>
        <div class="info" v-else>
            <ul v-if="person">
                <li>Фамилия:{{person.surname}}</li>
                <li>Имя:{{person.name}}</li>
                <li>Отчество:{{person.patronymic}}</li>
                <li>пол:{{person.gender === 'male'?'мужчина':'женщина'}}</li>
                <li>дата рождения:{{ date(person.dateOfBirth)}}</li>
            </ul>
<div v-else>
Не заполнена персональная информация. 
<span class="create_span">Заполнить+</span>
</div>
        </div>
    </div>
</VPageComponent>
</template>
<script setup lang="ts">
import { usePersonsStore } from '../../../stores/modules';
import VPageComponent from '../../common_components/VPageComponent.vue';
import VButton from '../../../components/ui-components/VButton.vue';
import { storeToRefs } from 'pinia';
import { useDateUtils } from '../../../composition/useDateUtils';
import VPersonCreateForm from '../../../components/form-components/VPersonCreateForm.vue';
import { useToggle } from '../../../compositon';
import VModal from '../../../components/VModal.vue';
import VLoader from '../../../components/ui-components/VLoader.vue';
const store = usePersonsStore()//useEmployersStore()
const {person} = storeToRefs(store)
const {date} = useDateUtils()
const {toggleElement,elementVisible:showForm} = useToggle()
const updatePerson = ()=>{
   toggleElement() 
}
const openForm =()=>{
toggleElement()
}
</script>
<style scoped lang="scss">
.content{
    display: grid;
    // width: 300px;
    grid-auto-flow: column;
    gap: .5rem;
}
.avatar{
    justify-self: left;

}
img{
    width: 128px;
    height: auto;
    border-radius: var(--common_border_radius);
}
ul{
    list-style: none;
    text-align: left;
}
.create_span{
    text-decoration: underline;
    color: blue;
    cursor: pointer;
    font-weight: bold;
}
</style>