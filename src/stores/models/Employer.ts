import { Type } from "class-transformer"
import { Account } from "./Account"
import { Person } from "./Person"
import { Position } from "./position/Position"

export class Employer{
  id?: string
  @Type(()=>Person)
  person?: Person
  accountID?: string
  positions:Position[] = []
  constructor() {
  }
}