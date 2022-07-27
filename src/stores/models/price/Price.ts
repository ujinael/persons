
import { Type } from 'class-transformer'
import {CreatePriceDto} from '../../modules/prices/dto/create-price.dto'
import {UpdatePriceDto} from '../../modules/prices/dto/update-price.dto'
import { PriceItem } from '../price_item/PriceItem'
import { Status } from '../Status'
export class Price {
  id?: string
@Type(()=>PriceItem)
  public priceItems:PriceItem[]= []

  constructor(
    public status: Status = Status.CREATED,
    // public priceItems:PriceItem[]= [],
    public title?: string,
    public description?: string,
){}
toCreate():CreatePriceDto{
return {...this}

}
toUpdate():UpdatePriceDto{
return {...this,id:this.id!,priceItems:undefined}

}

}

