import { Gender } from "../../../models"

export interface CreatePersonDto {
  surname: string 
  name: string 
  patronymic: string 
  dateOfBirth: Date
  gender:Gender
  employerID?: string
  clientID?:string
}