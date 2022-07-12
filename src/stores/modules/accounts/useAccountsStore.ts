import { defineStore } from 'pinia'
import router from '../../../router';
import { Login, Role } from '../../models'
import { Account } from '../../models/Account';
import { ApiError, Query, Api } from '../../server.api';
import { UpdateAccountDTO } from './dto/update-account.dto';
type AccountsState = {
  account: Account|null
}

export const useAccountsStore = defineStore('accounts', {
  state: ():AccountsState => {
    return {
      account:null
    }
  },
  actions: {
    createAccount() {
      this.account = new Account('')
    },
    async updateAccount() {
      if (this.account && this.account.id) {
        let dto: UpdateAccountDTO = {
          id: this.account.id,
          roles: this.account.roles.map(r => r.id!),
          login: this.account.login,
          password:this.account.password
        }
        await Api.shared().child('accounts', this.account.id)
          .update<UpdateAccountDTO,Account>(dto,Account).then(r => {
            this.account = r
          })

      }
    },
    async fetchAccount(id:string) {
      
      await Api.shared().child('accounts',id)
        .get<Account>([],Account).then(r => {   
          this.account = r          
        }).catch((e) => {
          alert(e)
          throw e
        })
    },

    addRole(role: Role) {
      const candidate = this.account?.roles.find(r => r.id === role.id)     
      if (!candidate)
      this.account?.roles.push(role)
    },
    removeRole(id: string) {
      if(this.account)
      this.account.roles = this.account?.roles.filter(r=>r.id!==id)
    }
  }
})