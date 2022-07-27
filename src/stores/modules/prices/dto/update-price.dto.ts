import { Status } from "../../../models";
import { CreatePriceDto } from "./create-price.dto";


export interface UpdatePriceDto extends CreatePriceDto{
  id: string
  status?:Status
}

