
import { defineStore } from 'pinia'
import { EmployersPositions } from '../../models/employers_positions/EmployersPositions';
import { CreateEmployersPositionsDto } from './dto/create-employersPositions.dto'
import { UpdateEmployersPositionsDto } from './dto/update-employersPositions.dto'

import {  Api } from '../../server.api';
type EmployersPositionsState = {
  loading: boolean
  employersPosition: EmployersPositions | null
  employersPositions:EmployersPositions[]
}
export const useEmployersPositionsStore = defineStore('employersPositions', {
  state: ():EmployersPositionsState => {
    return {
      loading:false,
      employersPosition: null,
     employersPositions:[]
    }
  },
  actions: {
setEmployersPositions(employersPosition?: EmployersPositions) {
this.employersPosition = employersPosition ?? new EmployersPositions()
},
async fetchEmployersPositionss() {
this.loading = true
await Api.shared().child('employers_positions')
.get<EmployersPositions[]>([], EmployersPositions).then(resp =>
{
this.employersPositions = resp
this.loading = false
}
)
},
async fetchOneEmployersPositions(id:string) {
this.loading = true
await Api.shared().child('employers_positions',id)
.get<EmployersPositions>([], EmployersPositions).then(resp =>
{
this.employersPosition = resp
this.loading = false
}
)
},
async saveEmployersPositions() {
this.loading = true
await Api.shared().child('employers_positions')
.post<CreateEmployersPositionsDto, EmployersPositions>(this.employersPosition!.toCreate(), EmployersPositions)
.then(employersPosition => {
this.employersPositions.push(employersPosition)
this.loading = false
})
 },
async updateEmployersPositions() {
this.loading = true
await Api.shared().child('employers_positions',this.employersPosition!.id!)
.update<UpdateEmployersPositionsDto, EmployersPositions>(this.employersPosition!.toUpdate(), EmployersPositions)
.then(employersPosition => {
this.employersPositions.push(employersPosition)
this.loading = false
})
},
async removeEmployersPositions(id:string) {
this.loading = true
await Api.shared().child('employers_positions',id)
.delete()
.then(employersPosition => {
this.employersPositions = this.employersPositions.filter(e=>e.id! !==id)
this.loading = false
})
},
  }
  })

