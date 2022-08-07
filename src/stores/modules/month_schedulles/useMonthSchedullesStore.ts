
import { defineStore } from 'pinia'
import { MonthSchedulle } from '../../models/month_schedulle/MonthSchedulle';
import {  Api } from '../../server.api';
import { CreateMonthSchedulleDto } from './dto/create-monthSchedulle.dto';
import { UpdateMonthSchedulleDto } from './dto/update-monthSchedulle.dto';
type MonthSchedullesState = {
  loading: boolean
  monthSchedulle: MonthSchedulle | null
  monthSchedulles:MonthSchedulle[]
}
export const useMonthSchedullesStore = defineStore('monthSchedulles', {
  state: ():MonthSchedullesState => {
    return {
      loading:false,
      monthSchedulle: null,
     monthSchedulles:[]
    }
  },
  actions: {
setMonthSchedulle(monthSchedulle?: MonthSchedulle) {
this.monthSchedulle = monthSchedulle ?? new MonthSchedulle(8,2022)
    },
    async fetchMonthSchedulleByDateComponents(month:number,year:number) {
      this.loading = true
      await Api.shared().child('month_schedulles')
      .get<MonthSchedulle>([{key:'month',value:''+month},{key:'year',value:''+year}], MonthSchedulle).then(resp =>
      {
      this.monthSchedulle = resp
      this.loading = false
      }
      )
      },
async fetchMonthSchedulles() {
this.loading = true
await Api.shared().child('month_schedulles')
.get<MonthSchedulle[]>([], MonthSchedulle).then(resp =>
{
this.monthSchedulles = resp
this.loading = false
}
)
},
async fetchOneMonthSchedulle(id:string) {
this.loading = true
await Api.shared().child('month_schedulles',id)
.get<MonthSchedulle>([], MonthSchedulle).then(resp =>
{
this.monthSchedulle = resp
this.loading = false
}
)
},
async saveMonthSchedulle() {
this.loading = true
await Api.shared().child('month_schedulles')
.post<CreateMonthSchedulleDto, MonthSchedulle>(this.monthSchedulle!.toCreate(), MonthSchedulle)
  .then(monthSchedulle => {
  this.monthSchedulle = monthSchedulle
this.monthSchedulles.push(monthSchedulle)
this.loading = false
})
 },
async updateMonthSchedulle() {
this.loading = true
await Api.shared().child('month_schedulles',this.monthSchedulle!.id!)
.update<UpdateMonthSchedulleDto, MonthSchedulle>(this.monthSchedulle!.toUpdate(), MonthSchedulle)
.then(monthSchedulle => {
this.monthSchedulles.push(monthSchedulle)
this.loading = false
})
},
async removeMonthSchedulle(id:string) {
this.loading = true
await Api.shared().child('month_schedulles',id)
.delete()
.then(monthSchedulle => {
this.monthSchedulles = this.monthSchedulles.filter(e=>e.id! !==id)
this.loading = false
})
},
  }
  })

