
import { Type } from "class-transformer"
import {CreateMeasureUnitDto} from '../../modules/measure_units/dto/create-measureunit.dto'
import {UpdateMeasureUnitDto} from '../../modules/measure_units/dto/update-measureunit.dto'
import { Option } from "../Option"
export class MeasureUnit implements Option
{
id?:string
  constructor(
    public title: string,
    public shortTitle:string
){}
toCreate():CreateMeasureUnitDto{
return {...this}

}
toUpdate():UpdateMeasureUnitDto{
return {...this,id:this.id!}

}

}

