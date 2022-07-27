
import { Type } from "class-transformer"
import {CreateClientDto} from '../../modules/Clients/dto/create-Client.dto'
import {UpdateClientDto} from '../../modules/Clients/dto/update-Client.dto'
import { Person } from "../Person"
export class Client {
  id?: string
  @Type(() => Person)
  public person?:Person

  
  constructor(
    public personId?: string
){}
  toCreate(): CreateClientDto{
return {}

}
toUpdate():UpdateClientDto{
return {}

}

}

