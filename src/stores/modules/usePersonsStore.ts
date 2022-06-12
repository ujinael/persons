import { defineStore } from 'pinia'
import { Person } from '../models'
type PersonsState = {
  persons:Person[]
}
export const useStore = defineStore('persons', {
  // arrow function recommended for full type inference
  state: ():PersonsState => {
    return {
      persons:[]
      // all these properties will have their type inferred automatically
    }
  },
})