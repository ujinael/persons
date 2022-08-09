
import { Type } from "class-transformer"
import {CreateSchedulleEventDto} from '../../modules/schedulle_events/dto/create-schedulleEvent.dto'
import {UpdateSchedulleEventDto} from '../../modules/schedulle_events/dto/update-schedulleEvent.dto'
import { Client } from "../client/Client"
import { EmployersPositions } from "../employers_positions/EmployersPositions"
import { SchedulleInterval } from "../../models"
export class SchedulleEvent extends SchedulleInterval{
  @Type(() => EmployersPositions)
  employerPosition?: EmployersPositions
   
  @Type(() => Client)
  client?:Client

  constructor(
    start: Date,
    end: Date,
    public position: { top: number, height: number } = { top: 0, height: 0 },
    public style:{gridRowStart:number,gridRowEnd:number,height:number} = {gridRowStart:1,gridRowEnd:2,height:30},
    public constraints: { top: number, bottom: number, minHeight: number } = { top: 0, bottom: 44, minHeight: 30 },
    public employersPositionId: string,
    public clientId?:string,
    employerPosition?: EmployersPositions,
  ) {
    super(start, end)
    this.employerPosition = employerPosition
}

toCreate():CreateSchedulleEventDto{
return {}

}
toUpdate():UpdateSchedulleEventDto{
return {}

}

}

