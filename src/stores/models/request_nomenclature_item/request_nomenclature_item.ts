
import { Type } from "class-transformer"
import {NomenclatureItem} from '../../models'
export class RequestNomenclatureItem {
id?:string
@Type(()=>NomenclatureItem)
item:NomenclatureItem
get coast(){
  return {
    rub:Math.trunc(this.count * this.rub + (this.penny * this.count/100))
  ,penny:(this.penny * this.count)%100
  }
}
constructor(
  public rub:number,
  public penny:number,
public count:number
){}
}

