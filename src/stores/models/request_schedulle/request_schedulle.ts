
import { Type } from "class-transformer"
import {CreateRequestSchedulleDto} from '../../modules/request_schedulles/dto/create-request-schedulle.dto'
import {UpdateRequestSchedulleDto} from '../../modules/request_schedulles/dto/update-request-schedulle.dto'
import { Client } from "../client/Client"
import { RequestNomenclatureItem } from "../../models"
import { SchedulleEven } from "../../models/schedulle_event/schedulle_event"
export class RequestSchedulle {
  id?: string
  @Type(()=>Client)
  client?: Client
  
  @Type(() => SchedulleEvent)
  events: SchedulleEvent[] = []
  
  @Type(() => RequestNomenclatureItem)
  nomenclatureItems: RequestNomenclatureItem[] = []
  
  constructor(public description:string = ''){}
toCreate():CreateRequestSchedulleDto{
return {}

}
toUpdate():UpdateRequestSchedulleDto{
return {}

}

}

