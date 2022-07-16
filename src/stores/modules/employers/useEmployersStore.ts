import { defineStore } from 'pinia'
import { Account, Gender, Person, Phone } from '../../models';
import { Employer } from '../../models/Employer';
import { Position } from '../../models/position/Position';
import {  Api } from '../../server.api';
import { usePersonsStore } from '../persons/usePersonsStore';
import { CreateAccountDTO } from './dto/CreateAccountDTO';
type EmployersState = {
  loading:boolean
  employers: Employer[]
  employer:Employer
}
export const useEmployersStore = defineStore('employers', {
  state: ():EmployersState => {
    return {
      loading:false,
      employers: [],
      employer:new Employer()
    }
  },
  actions: {
    async fetchUsers() {
      this.loading = true
      await Api.shared().child('employers').get<Employer[]>([],Employer)
        .then(resp => { 
          
          this.employers = resp//.map(r=>plainToClass(Employer,r))
          this.loading = false
        })

    },
    async fetchUser(id: string) {
      this.loading = true
      await Api.shared().child('employers',id).get<Employer>([],Employer)
        .then(resp => {   
          this.employer = resp
          // this.employer = plainToClass(Employer,resp)
          this.loading = false
        })

    },
    async setPersonToPersonStore() {
      const store = usePersonsStore()
      if (this.employer.person) {
store.setPerson(this.employer.person)
       }
      else {
        const person = new Person('', '', '', new Date(), Gender.MALE)
        person.employerID = this.employer.id!
        store.setPerson(person)
      }
    },
    async createNewEmployer() {
      this.loading = true
 await Api.shared().child('employers')
        .post<Employer, Employer>(this.employer,Employer).then(r => {
          this.employers.unshift(r)          
          this.loading = false
        })
    },
    async saveNewAccount(account:Account) {
     this.loading = true
const {login,password,roles} = account
      const dtoAccount: CreateAccountDTO = {
        login: login
        , password: password ?? ''
        , roles: roles.map(r => r.id!)
        , employerID:this.employer.id!
      }      
     return await Api.shared().child('employers', this.employer.id).child('create_account')
        .post<CreateAccountDTO, Account>(dtoAccount,Account).then(r => {
          this.loading = false
return r
        })
    },
    async setPosition(positionID: string) {
      this.loading = true
      await Api.shared().child('employers',`${this.employer.id}/set_position`)
        .update<{},Position>({}, Position, { key: 'positionID', value: positionID })
        .then(p => {
          console.log(p);
          
          this.employer.positions.unshift(p)
          this.loading = false

      })
    },
    async deletePosition(positionID:string) {
      this.loading = true
      await Api.shared().child('employers',`${this.employer.id}/unset_position`)
        .update<{},string>({}, Position, { key: 'positionID', value: positionID })
        .then(p => {
          this.employer.positions = this.employer.positions.filter(p=>p.id!=positionID)
          this.loading = false

      })
    }
  }

})