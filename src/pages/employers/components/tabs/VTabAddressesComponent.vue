<template>
  <div>
    <VModal v-model="form" title="Адрес">
      <VAddressForm :personID="personID" @close="toggleForm" />
    </VModal>
    <table>
        <caption>Адреса</caption>
      <thead>
        <th>тип</th>
        <th>страна</th>
        <th>область/край</th>
        <th>населенный пункт</th>
        <th>район</th>
        <th>улица</th>
        <th>дом</th>
        <th>корпус</th>
        <th>квартира</th>
        <th>дата регистрации</th>
        <th>почтовый индекс</th>
        <th><VButton rounded>+</VButton></th>
      </thead>
      <tbody>
        <tr @dblclick="editAddress(item)" v-for="(item, index) in addresses" :key="index">
        <td>{{item.type?.title}}</td>
        <td>{{item.country}}</td>
        <td>{{item.region}}</td>
        <td>{{item.city}}</td>
        <td>{{item.district}}</td>
        <td>{{item.street}}</td>
        <td>{{item.house}}</td>
        <td>{{item.corpus}}</td>
        <td>{{item.flat}}</td>
        <td>{{`${item.registrationDate.split('T')[0]}`}}</td>
        <td>{{item.postIndex}}</td>
        <td><VButton rounded :icon="'delete'" vStyle="delete"/></td>
        </tr>
      </tbody>
    </table>
     <div class="empty" v-if="!addresses.length">
      Адрес отсутствует.
      <a @click="createAddress">Создать+</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useToggle } from '../../../../compositon';
import VModal from '../../../../components/VModal.vue';
import { onMounted } from 'vue';
import { Address } from '../../../../stores/models/address/Address';
import { useAddressesStore } from '../../../../stores/modules/addresses/useAddressesStore';
import VAddressForm from '../../../../components/form-components/VAddressForm.vue';
import VButton from '../../../../components/ui-components/VButton.vue';
const props = defineProps<{
  personID: string;
}>();
const store = useAddressesStore();
const { addresses } = storeToRefs(store);
const { elementVisible: form, toggleElement: toggleForm } = useToggle();
const createAddress = () => {
  store.setAddress();
  toggleForm();
};
const editAddress = (address: Address) => {
  store.setAddress(address);
  toggleForm();
};

</script>
<style scoped lang="scss">
a {
  color: blue;
  text-decoration: none;
}
a:hover {
  cursor: pointer;
}
a:active {
  color: violet;
}
@import '../../../../assets/table.css';
</style>
