
import { Type } from "class-transformer"
import {CreateSchedullePresetDto} from '../../modules/schedulle_presets/dto/create-SchedullePreset.dto'
import {UpdateSchedullePresetDto} from '../../modules/schedulle_presets/dto/update-SchedullePreset.dto'
import { SchedulleInterval } from "../schedulle_interval/schedulle_interval"
import { Status } from "../Status"
export class SchedullePreset extends SchedulleInterval{    
  constructor(
    public start: Date,
    public end: Date,
    public color: string = '#FFFFFF',
    public selected: boolean = false,
    public title?: string,
    public status:Status = Status.ACTIVE

  ) {
   super(start,end)
}
toCreate():CreateSchedullePresetDto{
return {...this}

}
toUpdate():UpdateSchedullePresetDto{
return {...this,id:this.id!,selected:undefined}

}

}

