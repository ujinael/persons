import { Phone } from "./Phone"
import { Type } from 'class-transformer'
import { CreatePersonDto } from "../modules/persons/dto/createPerson.dto"
import { UpdatePersonDto } from "../modules/persons/dto/update-person.dto"

export enum Gender{
  MALE = 'male',FEMALE = 'female'
}
export class Person{
  id?:string
  surname: string = 'Иванов'
  name: string = 'Иван'
  patronymic: string = 'Иванович'
  dateOfBirth: Date
  pickDate: string = '1999-01-01'
  gender: Gender = Gender.MALE
  employerID?: string
  clientID?:string
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
      clientID:this.clientID
    }
  }
  constructor(surname: string
    , name: string
    , patronymic: string
    , dateOfBirth: Date
    , gender: Gender) {

    this.surname = surname
    this.name = name
    this.patronymic = patronymic
    this.dateOfBirth = dateOfBirth
    this.gender = gender
  }
}