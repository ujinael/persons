
import { Type } from "class-transformer"
import {CreatePositionDto} from '../../modules/positions/dto/create-position.dto'
import {UpdatePositionDto} from '../../modules/positions/dto/update-position.dto'
export class Position {
id?:string
  constructor(public title: string
    , public description: string
  ,public jobDesccription?:string) { }
toCreate():CreatePositionDto{
return {...this}

}
toUpdate():UpdatePositionDto{
return {...this,id:this.id!}

}

}

