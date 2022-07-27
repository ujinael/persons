
import { defineStore } from 'pinia'
import { Address, AddressType } from '../../models/address/Address';
import {  Api } from '../../server.api';
import { CreateAddressDto } from './dto/create-address.dto';
type AddressState = {
  loading: boolean
  address: Address|null
  addresses: Address[]
  types:AddressType[]
}
export const useAddressesStore = defineStore('addresses', {
  state: (): AddressState => {
    return {
      loading: false,
      address: null,
      addresses: [],
      types: []

    }
  },
  actions: {
    async fetchTypes() {
      this.loading = true
      Api.shared()
        .child('address_types')
        .get<AddressType[]>([], AddressType)
        .then(p => {
          this.types = p
          this.loading = false
        })
    },
    setAddress(address?: Address) {
      if (!address) this.address = new Address('', '', '', '', '','','','','')
      else this.address = address
    },
    async saveAddress(personID: string) {
      this.loading = true
      if (!this.address) throw new Error('Адрес не создан')
      this.address.personID = personID
      Api.shared()
        .child('addresses')
        .post<CreateAddressDto, Address>(this.address.toCreate(), Address)
        .then(a => {
          this.address = a
          this.loading = false
        })
    },
    async fetchAddress(personID: string) {
      this.loading = true
      Api.shared()
        .child('addresses')
        .get<Address[]>([{key:'personID',value:personID}], Address)
        .then(p => {
          this.addresses = p
          this.loading = false
        })
    }
  }
  })



