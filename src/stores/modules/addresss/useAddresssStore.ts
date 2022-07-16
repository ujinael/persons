
import { defineStore } from 'pinia'
import { Address } from '../../models/address/Address';
import {  Api } from '../../server.api';
type AddresssState = {
  loading:boolean
}
export const useAddresssStore = defineStore('addresss', {
  state: ():AddresssState => {
    return {
      loading:false,
     
    }
  },
  actions: {

  }
  })

