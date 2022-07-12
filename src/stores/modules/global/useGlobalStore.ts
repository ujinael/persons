import { defineStore } from "pinia"

type GlobalState = {
  timer:NodeJS.Timeout|null
  error:Error|null
}
export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => {
    return {
      error: null,
      timer:null
    }
  },
  actions: {
    setError(error: Error | null) {
      if (error) {
        this.timer = setTimeout(() => {
          // store.$reset
          this.error = null
          this.timer = null
        }, 300000)
        this.error = error
      }
      else {
        this.timer = null
        this.error = null
      }
    },

    
  }
  
})