
import { defineStore } from 'pinia'
import { MeasureUnit } from '../../models/measure_unit/MeasureUnit';
import {  Api } from '../../server.api';
import { CreateMeasureUnitDto } from './dto/create-measureunit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measureunit.dto';
type MeasureUnitsState = {
  loading: boolean
  measureUnit: MeasureUnit | null
  measureUnits:MeasureUnit[]
}
export const useMeasureUnitsStore = defineStore('measureUnits', {
  state: ():MeasureUnitsState => {
    return {
      loading:false,
      measureUnit: null,
      measureUnits:[]
    }
  },
  actions: {
setMeasureUnit(measureUnit?: MeasureUnit) {
this.measureUnit = measureUnit ?? new MeasureUnit('','')
},
async fetchMeasureUnits() {
this.loading = true
await Api.shared().child('measure_units')
.get<MeasureUnit[]>([], MeasureUnit).then(resp =>
{
this.measureUnits = resp
this.loading = false
}
)
},
async fetchOneMeasureUnit(id:string) {
this.loading = true
await Api.shared().child('measure_units',id)
.get<MeasureUnit>([], MeasureUnit).then(resp =>
{
this.measureUnit = resp
this.loading = false
}
)
},
async saveMeasureUnit() {
this.loading = true
await Api.shared().child('measure_units')
.post<CreateMeasureUnitDto, MeasureUnit>(this.measureUnit!.toCreate(), MeasureUnit)
.then(measureUnit => {
this.measureUnits.push(measureUnit)
this.loading = false
})
 },
async updateMeasureUnit() {
this.loading = true
await Api.shared().child('measure_units')
.update<UpdateMeasureUnitDto, MeasureUnit>(this.measureUnit!.toUpdate(), MeasureUnit)
.then(measureUnit => {
this.measureUnits.push(measureUnit)
this.loading = false
})
},
async removeMeasureUnit(id:string) {
this.loading = true
await Api.shared().child('measure_units',id)
.delete()
.then(measureUnit => {
this.measureUnits = this.measureUnits.filter(e=>e.id! !==id)
this.loading = false
})
},
  }
  })

