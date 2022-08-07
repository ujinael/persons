
import { defineStore } from 'pinia'
import { DaySchedulle } from '../../models/day_schedulle/day_schedulle';
import {  Api } from '../../server.api';
type DaySchedullesState = {
  loading:boolean
}
export const useDaySchedullesStore = defineStore('daySchedulles', {
  state: ():DaySchedullesState => {
    return {
      loading:false,
     
    }
  },
  actions: {

  }
  })

