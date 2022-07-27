<template>
  <div class="page_component">
    <div class="header">
      <div class="right"></div>
      <h3>Клиенты</h3>
      <div class="left"></div>
    </div>
    <table>
      <thead>
        <VTableHeaderCell>№</VTableHeaderCell>
        <VTableHeaderCell width="400px">ФИО</VTableHeaderCell>
        <VTableHeaderCell>пол</VTableHeaderCell>
        <VTableHeaderCell>дата рождения</VTableHeaderCell>
        <VTableHeaderCell>телефон</VTableHeaderCell>
        <VTableHeaderCell
          ><VButton rounded icon="add_person" @click="createClient()"
        /></VTableHeaderCell>
      </thead>
      <tbody>
        <tr
          @dblclick="onRowDbClick(item.id)"
          v-for="(item, index) in clients"
          :key="index"
        >
          <VTableCell :value="index + 1" />
          <VTableCell
            :value="
              item.person
                ? `${item.person.surname} ${item.person.name} ${item.person.patronymic}`
                : 'новый клиент'
            "
          />
          <VTableCell
            :value="item.person ? item.person.gender : 'не заполнено'"
          />
          <VTableCell
            :value="item.person ? item.person.dateOfBirth : 'не заполнено'"
          >{{item.person ? `${useDateFormat(item.person.dateOfBirth,'YYYY-MM-DD').value}` :'не заполнено'}}
</VTableCell>
          <VTableCell>
            <VPhone
              v-if="item.person && item.person.defaultPhone"
              :phone="item.person.defaultPhone"
            />
            <span v-else>нет</span></VTableCell
          >
          <VTableCell
            ><VButton icon="edit" vStyle="accept" rounded
          /></VTableCell>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {  useDateFormat } from '@vueuse/core'

import { useClientsStore } from '../../stores/modules/clients/useClientsStore';
import VTableHeaderCell from '../../components/ui-components/table/VTableHeaderCell.vue';
import VButton from '../../components/ui-components/VButton.vue';
import { onMounted } from 'vue';
import VTableCell from '../../components/ui-components/table/VTableCell.vue';
import { useRouter } from 'vue-router';
import VPhone from '../../components/ui-components/VPhone.vue';
const router = useRouter();
const store = useClientsStore();
const { clients } = storeToRefs(store);
const createClient = () => {
  store.setClient();
  store.saveClient();
};
const onRowDbClick = (id?: string) => {
  if (id) router.push(`/clients/${id}`);
};
onMounted(() => {
  store.fetchClients();
});
</script>
<style scoped lang="scss">
@import '../../assets/page-component.scss';
@import '../../assets/table.css';
</style>
