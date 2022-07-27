
import { defineStore } from 'pinia'
import { Gender, Person } from '../../models';
import { Client } from '../../models/client/Client';
import {  Api } from '../../server.api';
import { usePersonsStore } from '../persons/usePersonsStore';
import { CreateClientDto } from './dto/create-Client.dto';
import { UpdateClientDto } from './dto/update-Client.dto';
type ClientsState = {
  loading: boolean
  client: Client|null
  clients:Client[]
}
export const useClientsStore = defineStore('clients', {
  state: ():ClientsState => {
    return {
      loading: false,
      client: null,
      clients:[]
     
    }
  },
  actions: {
setClient(client?: Client) {
this.client = client ?? new Client()
    },
    setPersonToPersonStore() {
      if (this.client) {
        const personStore = usePersonsStore()
        if(this.client.personId)personStore.fetchOnePerson(this.client.personId)
else {personStore.setPerson(new Person('не заполнено','не заполнено','не заполнено',new Date(),Gender.MALE,undefined,this.client.id))}
      }

    },
async fetchClients() {
this.loading = true
await Api.shared().child('clients')
.get<Client[]>([], Client).then(resp =>
{  
this.clients = resp
this.loading = false
}
)
},
    async fetchOneClient(id: string) {  
this.loading = true
await Api.shared().child('clients',`${id}`)
.get<Client>([], Client).then(resp =>
{
this.client = resp
this.loading = false
}
)
},
async saveClient() {
this.loading = true
await Api.shared().child('clients')
.post<CreateClientDto, Client>(this.client!.toCreate(), Client)
.then(client => {
this.clients.push(client)
this.loading = false
})
 },
async updateClient() {
this.loading = true
await Api.shared().child('clients',this.client!.id!)
.update<UpdateClientDto, Client>(this.client!.toUpdate(), Client)
.then(client => {
this.clients.push(client)
this.loading = false
})
},
async removeClient(id:string) {
this.loading = true
await Api.shared().child('clients',id)
.delete()
.then(client => {
this.clients = this.clients.filter(e=>e.id! !==id)
this.loading = false
})
},
  }
  })

