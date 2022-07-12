import { Gender } from "../../../models"

export interface UpdatePersonDto {
  id:string
  surname?: string 
  name?: string 
  patronymic?: string 
  dateOfBirth?: Date
  gender?:Gender
  employerID?: string
  clientID?:string
}