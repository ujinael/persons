import { Type } from "class-transformer"
import { Person } from "./Person"
import { Position } from "./position/Position"
import { Speciality } from "./speciality/Speciality"

export class Employer{
  id?: string
  @Type(()=>Person)
  person?: Person
  personId?:string
  accountID?: string
  @Type(()=>Position)
  positions: Position[] = []
  @Type(()=>Speciality)
  specialities:Speciality[] = []

  constructor() {
  }
}