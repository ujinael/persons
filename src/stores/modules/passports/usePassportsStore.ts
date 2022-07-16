
import { defineStore } from 'pinia'
import { Passport, PassportType } from '../../models/passport/Passport';
import {  Api } from '../../server.api';
import { CreatePassportDto } from './dto/create-passport.dto';
type PassportsState = {
  loading: boolean
  passport: Passport|null
  passports: Passport[]
  types:PassportType[]
}
export const usePassportsStore = defineStore('passports', {
  state: (): PassportsState => {
    return {
      loading: false,
      passport: null,
      passports: [],
      types: []

    }
  },
  actions: {
    async fetchTypes() {
      this.loading = true
      Api.shared()
        .child('passport_types')
        .get<PassportType[]>([], PassportType)
        .then(p => {
          this.types = p
          this.loading = false
        })
    },
    setPassport(passport?: Passport) {
      if (!passport) this.passport = new Passport('', '', '', '', '')
      else this.passport = passport
    },
    async savePassport(personID: string) {
      this.loading = true
      if (!this.passport) throw new Error('Паспорт не создан')
      this.passport.personID = personID
      Api.shared()
        .child('passports')
        .post<CreatePassportDto, Passport>(this.passport.toCreate(), Passport)
        .then(p => {
          this.passport = p
          this.loading = false
        })
    },
    async fetchPassport(personID: string) {
      this.loading = true
      Api.shared()
        .child('passports')
        .get<Passport[]>([{key:'personID',value:personID}], PassportType)
        .then(p => {
          this.passports = p
          this.loading = false
        })
    }
  }
  })

