
import { defineStore } from 'pinia'
import { Position } from '../../models/position/Position';
import {  Api } from '../../server.api';
type PositionsState = {
  loading: boolean
  position: Position | null
  positions:Position[]
}
export const usePositionsStore = defineStore('positions', {
  state: ():PositionsState => {
    return {
      loading:false,
      position: null,
     positions:[]
    }
  },
  actions: {
    async fetchAllPositions() {
      this.loading = true
      await Api.shared().child('positions')
        .get<Position[]>([], Position).then(ps => {
          this.positions = ps
        this.loading = false
      })
    },
    async uploadJobDescription(file: any,id:string) {
      const formData = new FormData()
      formData.append('jobDescription',file)
      this.loading = true
      await Api.shared().child('positions',`${id}/create_job_description`)
      .upload(formData,String).then()
    }
  }
  })

