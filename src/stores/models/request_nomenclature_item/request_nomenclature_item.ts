
import { Type } from "class-transformer"
export class RequestNomenclatureItem {
id?:string
@Type(()=>NomenclatureItem)
nomenclatureItem:NomenclatureItem
count:number
rub:number
penny:number

}

