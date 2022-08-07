<template>

<VPageComponent :label="'Аккаунт'">
    <template #rbuttons>
        <VButton
        @click="editMode = !editMode"
         :vStyle="'accept'" 
         icon="edit" rounded/>
    </template>
    <VModal title="Роли" v-model="showRoles">
<VRolesCatalogue @select="selectRole"/>
</VModal>
    <div class="content">
       <ul v-if="account">
       <Transition mode="out-in" name="fade">
       <section class="edit_false" v-if="!editMode">
       <li>
        <span >
   Логин: {{account.login}}  
</span>
 </li>
<li>
    <span >
   Пароль: ****** 
</span>
</li>
       </section>
       <section v-else>
         <li>
 <label>Логин:
     <input placeholder="логин" type="text" v-model="account.login"/>
     </label>       
        </li>
        <li>
 <label >Пароль: 
    <input placeholder="новый пароль" type="text" v-model="account.password"/></label>          
       </li>  
       </section>
       </Transition>   
        <li>
            <label for="#tips">Роли: </label> 
            <div class="tips" id="tips">
 <VTip :remove="editMode" v-for="(item, index) in account.roles"
            :key="index"
            :title="item.description"
            @onDeleteClick = "accountStore.removeRole(item.id!)"
            />
            <VTip :type="'add'"
             title='+' 
             v-if="editMode" 
             @click="toggleElement"
             />

            </div>
             </li>
             <li v-if="editMode" class="actions">
                <VButton :vStyle="'accept'" rounded @click="saveAccount">Сохранить</VButton>
                <VButton :vStyle="'cancel'" rounded @click="editMode = !editMode">Отмена</VButton>

             </li>
    </ul>  
    <div v-else class="alt">
У пользователя нет аккаунта. 
<strong @click="createAccount">Создать+</strong> 
    </div>
    </div>
   
</VPageComponent>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import VButton from '../../../components/ui-components/VButton.vue';
import { useToggle } from '../../../composition';
import { useEmployersStore,useAccountsStore } from '../../../stores/modules';
import VPageComponent from '../../common_components/VPageComponent.vue';
import VModal from '../../../components/VModal.vue';
import VAccountForm from '../../../components/form-components/VAccountForm.vue';
import { Account, Role } from '../../../stores/models';
import VTip from '../../../components/ui-components/VTip.vue';
import { ref } from 'vue';
import VInput from '../../../components/ui-components/VInput.vue';
import VRolesCatalogue from '../../../components/catalogues/VRolesCatalogue.vue';
const store = useEmployersStore()
const accountStore = useAccountsStore()
const {account} = storeToRefs(accountStore)

const {employer} = storeToRefs(store)

const editMode = ref<boolean>(false)
const {toggleElement,elementVisible:showRoles} = useToggle()
const selectRole = (role:Role)=>{
    accountStore.addRole(role)
    toggleElement()
}
const createAccount = ()=>{
accountStore.createAccount()
editMode.value = true
}
const saveAccount = ()=>{
    if(account.value)
   {
    if(!account.value.id)
    store.saveNewAccount(account.value).then(acc =>
   {
    account.value = acc
    editMode.value = false 
   }
    ) 
    else{
        accountStore.updateAccount().then(()=>{
                editMode.value = false 
        })        
    }
   }
   
}
</script>
<style scoped lang="scss">
.page_component{
    width: 100%;
    height: 100%;
}
ul{
    list-style: none;
    text-align: left;
    
}
li{
    margin: .6rem 0;
    width: 100%;
    display:flex;
}
label{
    margin-right: .2rem;
}
.content{
    // width: 350px;
}
strong{
    text-decoration: underline;
    color: blue;
}
strong:hover{
    cursor: pointer;
    color: violet;
}
.actions{
    display: flex;
    justify-content: right;
    gap: .5rem;
}
label{
    width: 100%;
    display: grid;
    grid-template-columns: min-content 70%;
    justify-content: space-between
}
@import '../../../assets/inline_input.scss';
@import '../../../assets/tips.scss';
@import '../../../assets/show-animation.css';
</style>