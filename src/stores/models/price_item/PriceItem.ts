
import { Type } from "class-transformer"
import {CreatePriceItemDto} from '../../modules/price_items/dto/create-priceItem.dto'
import {UpdatePriceItemDto} from '../../modules/price_items/dto/update-priceItem.dto'
import { NomenclatureItem } from "../nomenclature_item/NomenclatureItem"
export class PriceItem {
  @Type(()=>NomenclatureItem)
  public item?: NomenclatureItem

id?:string
  constructor(
    public ruble: number = 0,
    public penny: number = 0,
    public edit:boolean = false,
    
){}
toCreate():CreatePriceItemDto{
return {...this,itemID:this.item!.id!}

}
toUpdate():UpdatePriceItemDto{
return {...this,id:this.id!,edit:undefined}

}

}

