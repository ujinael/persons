<template>
<div>
    <VModal v-model="form" title="Пасспорт">
        <VPassportForm
        @close="toggleForm"
        />
    </VModal>
  
    <table>
        <caption>Паспорта</caption>
        <thead>
            <th>тип документа</th>
            <th>серия</th>
            <th>номер</th>
            <th>код подразделения</th>
            <th>кем выдан</th>
            <th>дата выдачи</th>
            <th>дата окончания</th>
            <th>место рождения</th>
            <th><VButton rounded>+</VButton></th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in passports" :key="index">
<td>{{item.type?.title}}</td>
<td>{{item.seria}}</td>
<td>{{item.number}}</td>
<td>{{item.code}}</td>
<td>{{item.department}}</td>
<td>{{`${item.dateOfIssue.split('T')[0]}`}}</td>
<td>{{`${item.dateOfIssue.split('T')[0]}`}}</td>
<td>{{item.bornPlace}}</td>
<td><VButton rounded vStyle='delete' :icon="'delete'"/></td>

            </tr>
        </tbody>
    </table>
      <div class="empty" v-if="!passports.length">
Документ удостоверяющий личность отсутствует.
<a @click="createPassport">Создать+</a>
    </div>
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useToggle } from '../../../../composition';
import { usePassportsStore } from '../../../../stores/modules/passports/usePassportsStore';
import VModal from '../../../../components/VModal.vue';
import VPassportForm from '../../../../components/form-components/VPassportForm.vue';
import { Passport } from '../../../../stores/models/passport/Passport';
import VButton from '../../../../components/ui-components/VButton.vue';

const store = usePassportsStore()
const {passports} = storeToRefs(store)
const  {elementVisible:form,toggleElement:toggleForm} = useToggle()
const createPassport = ()=>{
    store.setPassport()
    toggleForm()
}
const editPassport = (passport:Passport)=>{
store.setPassport(passport)
    toggleForm()
}

</script>
<style scoped lang="scss">
a{
color:blue;
text-decoration: none;
}
a:hover{
    cursor: pointer;
}
a:active{
color:violet;
}
ul{
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3,1fr)
}
@import '../../../../assets/table.css';
@import '../../../../assets/row_actions.scss';
.actions{
    justify-content: right;
}
</style>