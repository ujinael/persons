
import { Type } from "class-transformer"
import {CreateSchedulleEventDto} from '../../modules/schedulle_events/dto/create-schedulleEvent.dto'
import {UpdateSchedulleEventDto} from '../../modules/schedulle_events/dto/update-schedulleEvent.dto'
import { SchedulleInterval } from "../schedulle_interval/schedulle_interval"
export class SchedulleEvent extends SchedulleInterval{
  constructor(
    start: Date,
    end: Date,
    public position: { top: number, height: number } = { top: 0, height: 0 },
    public style:{gridRowStart:number,gridRowEnd:number,height:number} = {gridRowStart:1,gridRowEnd:2,height:30},
   public constraints : {top:number, bottom:number, minHeight:number} = {top:0,bottom:44,minHeight:30}
  ) {
    super(start,end)
}

toCreate():CreateSchedulleEventDto{
return {}

}
toUpdate():UpdateSchedulleEventDto{
return {}

}

}

