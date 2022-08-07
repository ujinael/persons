
import { Type } from "class-transformer"
import {CreateDaySchedulleDto} from '../../modules/daySchedulles/dto/create-daySchedulle.dto'
import {UpdateDaySchedulleDto} from '../../modules/daySchedulles/dto/update-daySchedulle.dto'
import { Employer } from "../Employer"
import { Status } from "../Status"
import {SchedulleInterval} from '../schedulle_interval/schedulle_interval'

export class DaySchedulle extends SchedulleInterval{
  @Type(()=>Employer)
  employer?: Employer
constructor(
  public start: Date,
  public end: Date,
  public employerSchedulleId: string,
  public dayNumber: number,
  public selected: boolean,
  public status: Status = Status.CREATED,
  public color?: string
) {
  super(start, end);
}
toCreate():CreateDaySchedulleDto{
return {...this,status:undefined,selected:undefined}

}
toUpdate():UpdateDaySchedulleDto{
return {...this,status:undefined,selected:undefined}

}

}

