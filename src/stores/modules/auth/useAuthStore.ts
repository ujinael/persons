import { defineStore } from 'pinia'
import router from '../../../router';
import { Login } from '../../models'
import { Account } from '../../models/Account';
import { ApiError, Query, Api } from '../../server.api';
type AuthState = {
  login: Login
  authorizedAccount?:Account
}

export const useAuthStore = defineStore('auth', {
  state: ():AuthState => {
    return {
      login: new Login('', ''),
      authorizedAccount:undefined
    }
  },
  actions: {
    async loginSubmit() {
      
      await Api.shared().child('auth').child('login')
        .post<Login, Account>(this.login,Account).then(r => {   
          this.authorizedAccount = r
         localStorage.setItem('account',JSON.stringify(r))
        }).catch((e) => {
          alert(e)
          throw e
        })
    },
     logout() {
      localStorage.removeItem('account')
    router.push('auth')
    }
  }
})