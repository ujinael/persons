import { defineStore } from 'pinia'
import { Role } from '../../models';
import { Api } from '../../server.api';
import { RoleListDTO } from './dto/RoleListDTO';
type RolesState = {
  roles:Role[]
  role: Role

}

export const useRolesStore = defineStore('roles', {
  state: ():RolesState => {
    return {
      roles: [],
      role:new Role('','')
    }
  },
  actions: {
    async fetchRoles() {
      await Api.shared()
        .child('roles')
        .get<RoleListDTO[]>([], Role).then(r => {            
          this.roles = r.map<Role>(role => role
            )
        }).catch((e) => {
          alert(e)
          throw e
        })
    },
 
  }
})