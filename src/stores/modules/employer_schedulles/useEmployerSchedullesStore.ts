import { defineStore } from 'pinia';
import { useDateUtils } from '../../../composition';
import { Status } from '../../models';
import { DaySchedulle } from '../../models/day_schedulle/day_schedulle';
import { EmployerSchedulle } from '../../models/employer_schedulle/EmployerSchedulle';
import { Api } from '../../server.api';
import { CreateEmployerSchedulleDto } from './dto/create-employerSchedulle.dto';
import { UpdateEmployerSchedulleDto } from './dto/update-employerSchedulle.dto';

const { daysInMonth } = useDateUtils();

type EmployerSchedullesState = {
  loading: boolean;
  employerRow: EmployerSchedulle | null;
  employerRows: EmployerSchedulle[];
  currentDate: Date;
};
export const useEmployerSchedullesStore = defineStore('employerSchedulles', {
  state: (): EmployerSchedullesState => {
    return {
      loading: false,
      employerRow: null,
      employerRows: [],
      currentDate: new Date(),
    };
  },
  getters: {
    getDaysOfMonth: (state) => {
      return daysInMonth(state.currentDate);
    },
  },
  actions: {
    setEmployerSchedulle(item?:EmployerSchedulle){
if(item) this.employerRow = item
    },
    async fetchEmployerSchedulles(monthId:string = 'c0be222d-a7ec-4c20-a488-c653bf435478') {
      this.loading = true;

      
      await Api.shared()
        .child('employer_schedulles')
        .get<EmployerSchedulle[]>([{key:'monthId',value:monthId}], EmployerSchedulle)
        .then((r) => {

    r.forEach(
            (e) => this.setEmployerDays(e)
    );
       this.employerRows = r   
          
        });
    },
  
    async fetchOneEmployerSchedulle(id:string) {
    this.loading = true
    await Api.shared().child('employer_schedulles',id)
    .get<EmployerSchedulle>([], EmployerSchedulle).then(resp =>
    {
    this.employerRow = resp
    this.loading = false
    }
    )
    },
    async saveEmployerSchedulle() {
    this.loading = true
    await Api.shared().child('employer_schedulles')
    .post<CreateEmployerSchedulleDto, EmployerSchedulle>(this.employerRow!.toCreate(), EmployerSchedulle)
      .then(employerRow => {
        employerRow.employerPosition = this.employerRow?.employerPosition
        this.setEmployerDays(employerRow)
    this.employerRows.unshift(employerRow)
    this.loading = false
    })
     },
    async updateEmployerSchedulle() {
      this.loading = true
      if (this.employerRow) {
       await Api.shared().child('employer_schedulles',this.employerRow.id!)
         .update<UpdateEmployerSchedulleDto, EmployerSchedulle>(
           this.removeEmptyDays(this.employerRow).toUpdate()
           , EmployerSchedulle)
    .then(employerRow => {
    // this.employerRows.push(employerRow)
    this.loading = false
    })
    }
      else {
        throw new Error('employerSchedulle не выбрана')
   }
    },
    async removeEmployerSchedulle(id:string) {
    this.loading = true
    await Api.shared().child('employer_schedulles',id)
    .delete()
    .then(employerRow => {
    this.employerRows = this.employerRows.filter(e=>e.id! !==id)
    this.loading = false
    })
    },
    setEmployerDays(employerSchedulle: EmployerSchedulle) {
      
      employerSchedulle.days = [...Array(this.getDaysOfMonth).keys()].map(
        i => {
          let day = employerSchedulle.days.find(d=>d.dayNumber === i+1)
          if (day) {
            day.status = Status.ACTIVE
            return day
          }
         day =   new DaySchedulle(
            new Date()
            , new Date()
            , employerSchedulle.id!
            , i + 1
            , false
            , Status.CREATED
            ,undefined
          )
          return day
        }
       
        
      )
    },
    removeEmptyDays(item: EmployerSchedulle) {
      const employerSchedulle = new EmployerSchedulle(item.employerPosition?.id!, item.monthSheduleId, item.id)
      employerSchedulle.days = item.days.filter(d=>d.status == Status.ACTIVE)
      return employerSchedulle
    },
    increaseMonth() {
      console.log(this.currentDate);
      
      const newDate = new Date(
        this.currentDate.toDateString()
      );
      const currentMonth = newDate.getMonth() 
      newDate.setMonth(currentMonth + 1)
      return newDate
    },
    decreaseMonth() {
      const newDate = new Date(
        this.currentDate.toDateString()
      );
      const currentMonth = newDate.getMonth() 

      newDate.setMonth(currentMonth - 1)
      return newDate
    },
  },
});
