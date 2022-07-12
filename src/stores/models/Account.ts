import { Type } from "class-transformer"
import { Role } from "./Role"

export class Account {
  id?:string
  login: string
  password?: string
  employerID?: string
  accountID?:string
  @Type(() => Role)

  roles: Role[]  
  constructor(login: string, roles: Role[] = [],id?: string) {
    this.login = login
    this.id = id
    this.roles = roles
  }
}