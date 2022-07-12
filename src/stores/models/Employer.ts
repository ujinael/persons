import { Type } from "class-transformer"
import { Account } from "./Account"
import { Person } from "./Person"

export class Employer{
  id?: string
  @Type(()=>Person)
  person?: Person
accountID?:string
  constructor() {
  }
}