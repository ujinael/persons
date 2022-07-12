import { defineStore } from 'pinia'
import { Phone, PhoneType, Role } from '../../models';
import { Api } from '../../server.api';
import { useGlobalStore } from '../global/useGlobalStore';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
type PhonesState = {
  loading:boolean
  phone: Phone
phones:Phone[]
}

export const usePhonesStore = defineStore('phones', {
  state: ():PhonesState => {
    return {
      phone: new Phone('', PhoneType.MOBILE),
      phones: [],
      loading:false
    }
  },
  actions: {
    async setPhone(phone:Phone) {
      this.phone = phone
    },
    async removePhone(id: string) {
      this.loading = true
     await Api.shared().child('persons').child('remove_phone',id)
        .delete()
       .then(() => {
          this.phones = this.phones.filter(p=>p.id! !==id)
          this.loading = false

       })
    
    },
    async fetchPhonesByPersonID(id: string) {
      this.loading = true
      await Api.shared().child('persons', id).child('phones')
        .get<Phone[]>([], Phone)
        .then(phones => {          
        this.phones = phones
          this.loading = false
      })
    },
    async savePhone(id:string) {
      await Api.shared().child('persons', id).child('add_phone')
        .post<CreatePhoneDto, Phone>(this.phone.toCreate(), Phone)
        .then(phone => {
        this.phones.push(phone)
      })
    },
    async updatePhone(id:string) {
      await Api.shared().child('persons', id).child('update_phone')
        .update<UpdatePhoneDto, Phone>(this.phone.toUpdate(), Phone)
        .then(phone => {
        this.phones.push(phone)
      })
    },
  


  }
})