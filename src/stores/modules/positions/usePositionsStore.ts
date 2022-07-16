
import { defineStore } from 'pinia'
import { Position } from '../../models/position/Position';
import {  Api } from '../../server.api';
import { CreatePositionDto } from './dto/create-position.dto';
type PositionsState = {
  loading: boolean
  position: Position | null
  positions: Position[]
  showForm:boolean
}
export const usePositionsStore = defineStore('positions', {
  state: ():PositionsState => {
    return {
      loading:false,
      position: null,
      positions: [],
     showForm:false
    }
  },
  actions: {
    toggleForm(){this.showForm = !this.showForm},
    setPosition(position?: Position) {
      this.position = position ?? new Position('','')
    },
    async fetchAllPositions(departmentID?:string) {
      const queries = []
      if (departmentID)queries.push({key:'department_id',value:departmentID})
      this.loading = true
      await Api.shared().child('positions')
        .get<Position[]>(queries, Position).then(ps => {
          this.positions = ps
        this.loading = false
      })
    },
    async savePosition(departmentID: string) {
      if(this.position)
        this.position.departmentID = departmentID
      else throw new Error("Дожность не задана");
      
      this.loading = true
      await Api.shared().child('positions')
      .post<CreatePositionDto,Position>(this.position!.toCreate(),Position)
      .then(p=>{
        this.position = p
        this.positions.unshift(p)
       this.loading = false
      })
    },
    async uploadJobDescription(file: any,id:string) {
      const formData = new FormData()
      formData.append('jobDescription', file)      
      this.loading = true
      await Api.shared().child('positions',`${id}/create_job_description`)
        .upload<FormData,{id:string,jobDescription:string}>(formData, Object).then(r => {
        console.log(r.jobDescription);
        
          const pos = this.positions.find(p => p.id === r.id)
          console.log(pos);
          
          if (pos) {
            pos.jobDescription = r.jobDescription
            // this.positions = this.positions.filter(p => p.id !== pos.id)
            // this.positions = [...this.positions,pos]
          }
          })
    }
  }
  })

