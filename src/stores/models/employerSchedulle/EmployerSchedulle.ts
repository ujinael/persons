
import { Type } from "class-transformer"
import {CreateEmployerSchedulleDto} from '../../modules/employerSchedulles/dto/create-employerSchedulle.dto'
import {UpdateEmployerSchedulleDto} from '../../modules/employerSchedulles/dto/update-employerSchedulle.dto'
import { Employer } from "../Employer"
import { EmployerInterval } from "../scheduleInterval/scheduleInterval"
export class EmployerSchedulle extends EmployerInterval {
  
  constructor(
    public start: Date,
    public end: Date,
    public employerId: string,
    public month: number,
    public year: number,
    public employer?: Employer,
    public days:EmployerInterval[] = []
  ) {
    super(start,end,employerId,month,year)
  }
toCreate():CreateEmployerSchedulleDto{
return {}

}
toUpdate():UpdateEmployerSchedulleDto{
return {}

}

}

