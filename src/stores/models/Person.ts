import { Phone } from "./Phone"
import { Type } from 'class-transformer'
import { CreatePersonDto } from "../modules/persons/dto/createPerson.dto"
import { UpdatePersonDto } from "../modules/persons/dto/update-person.dto"

export enum Gender{
  MALE = 'male',FEMALE = 'female'
}
export class Person{
  id?:string
  pickDate: string = '1999-01-01'
  @Type(() => Phone)
  phones: Phone[] = []

  @Type(() => Phone)
  defaultPhone?: Phone
  
  toCreate():CreatePersonDto {
    return {
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
      dateOfBirth: new Date(this.pickDate),
      gender: this.gender,
      employerID: this.employerID,
      clientID:this.clientID
    }
  }
  toUpdate():UpdatePersonDto {
    return {
id:this.id??'',
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
      dateOfBirth: new Date(this.pickDate),
      gender: this.gender,
      employerID: this.employerID,
      clientID: this.clientID,
      
    }
  }
  constructor(
    public surname: string,
    public name: string,
    public patronymic: string,
    public dateOfBirth: Date,
    public gender: Gender,
    public employerID?: string,
 public clientID?:string
  ) {

  }
}