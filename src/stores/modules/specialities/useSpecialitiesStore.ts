
import { defineStore } from 'pinia'
import { Speciality } from '../../models/speciality/Speciality';
import {  Api } from '../../server.api';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
type SpecialitysState = {
  loading: boolean
  speciality: Speciality | null;
  specialities:Speciality[]
}
export const useSpecialitiesStore = defineStore('specialities', {
  state: ():SpecialitysState => {
    return {
      loading: false,
      speciality: null,
      specialities:[]
    }
  },
  actions: {
    setSpeciality(speciality?: Speciality) {
      this.speciality = speciality ?? new Speciality('','')
    },
    async fetchAllSpecialities() {
      this.loading = true
      await Api.shared().child('specialities')
        .get<Speciality[]>([], Speciality).then(ps => {
          this.specialities = ps
        this.loading = false
      })
    },
    async saveSpeciality() {
      
      this.loading = true
    return  await Api.shared().child('specialities')
      .post<CreateSpecialityDto,Speciality>(this.speciality!.toCreate(),Speciality)
      .then(p=>{
        this.speciality = p
        this.specialities.unshift(p)
        this.loading = false
        return p
      })
    },
  }
  })

