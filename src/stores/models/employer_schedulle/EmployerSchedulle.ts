
import { Type } from "class-transformer"
import {CreateEmployerSchedulleDto} from '../../modules/employer_schedulles/dto/create-employerSchedulle.dto'
import {UpdateEmployerSchedulleDto} from '../../modules/employer_schedulles/dto/update-employerSchedulle.dto'
import { EmployersPositions } from "../employers_positions/EmployersPositions"
import { DaySchedulle } from "../day_schedulle/day_schedulle"
export class EmployerSchedulle  {
  @Type(() => EmployersPositions)
  public employerPosition?: EmployersPositions
  @Type(()=>DaySchedulle)
  public days:DaySchedulle[] = []
  constructor(
    public employersPositionId: string,
    public monthSheduleId: string,
    public id?:string
  ) {
  }

toCreate():CreateEmployerSchedulleDto{
return {employerPositionId:this.employerPosition?.id!,monthSchedulleId:this.monthSheduleId}

}
toUpdate():UpdateEmployerSchedulleDto{
return {...this,id:this.id!,days:this.days.map(d=>d.toUpdate())}

}

}

