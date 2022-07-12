import { defineStore } from 'pinia'
import { Person } from '../../models'
import {Api } from '../../server.api';
import { useEmployersStore } from '../employers/useEmployersStore';
import { CreatePersonDto } from './dto/createPerson.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
type PersonsState = {
  loading:boolean
  person:Person|null
}
export const usePersonsStore = defineStore('persons', {
  state: (): PersonsState => {
    return {
      person: null,
      loading: false
    }
  },
  actions: {
    setPerson(person: Person) {
      this.person = person
    },
    async savePerson() {
      if (this.person) {
        const store = useEmployersStore()
        this.loading = true
        await Api.shared().child('persons')
          .post<CreatePersonDto, Person>(this.person.toCreate(), Person).then(r => {
            this.loading = true
            this.person = r
store.employer.person = r
          })
      }
    
    },
    async updatePerson() {
      if (this.person) {
        this.loading = true
        await Api.shared().child('persons',this.person.id)
          .update<UpdatePersonDto, Person>(this.person.toUpdate(), Person).then(r => {
            this.loading = true
            this.person = r
          })
      }
    }
 
  }
})