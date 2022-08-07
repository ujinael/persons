
import { Type } from "class-transformer"
import {CreateEmployersPositionsDto} from '../../modules/employers_positions/dto/create-employersPositions.dto'
import {UpdateEmployersPositionsDto} from '../../modules/employers_positions/dto/update-employersPositions.dto'
import { Employer } from "../Employer"
import { Position } from "../position/Position"
export class EmployersPositions {
id?:string
  @Type(() => Employer)
 public employer?: Employer
  
  @Type(() => Position)
 public position?: Position
  
 get employerTitle() {
   if (this.employer) {
     return `${this.employer.person?.surname}
     ${this.employer.person?.name[0]}. ${this.employer.person?.patronymic[0]}.`
   }
   return ''
}
toCreate():CreateEmployersPositionsDto{
return {}

}
toUpdate():UpdateEmployersPositionsDto{
return {}

}

}

