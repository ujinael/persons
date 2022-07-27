import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../modules/addresses/dto/create-address.dto';
import { UpdateAddressDto } from '../../modules/addresses/dto/update-address.dto';
export class AddressType {
  constructor(
    public title: string,
    public description: string,
    public id?: string,
  ) {}
}
export class Address {
  id?: string
  constructor(
    public country: string,
    public region: string,
    public city: string,
    public district: string,
    public street: string,
    public house: string,
    public corpus: string,
    public flat: string,
    public registrationDate:string,
    public type?: AddressType,
    public postIndex?: string,
    public personID?:string 
  ) {}
  toCreate(): CreateAddressDto {
    return {...this,typeID:this.type?.id!,personID:this.personID!,registrationDate:new Date(this.registrationDate)};
  }
  toUpdate(): UpdateAddressDto {
    return {...this,typeID:this.type?.id,id:this.id!,registrationDate:new Date(this.registrationDate)};
  }
}
