import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../modules/addresss/dto/create-address.dto';
import { UpdateAddressDto } from '../../modules/addresss/dto/update-address.dto';
export class AdressType {
  constructor(
    public title: string,
    public description: string,
    public id?: string,
  ) {}
}
export class Address {
  id?: string
  constructor(
    public type: AdressType,
    public country: string,
    public region: string,
    public city: string,
    public district: string,
    public street: string,
    public house: string,
    public corpus: string,
    public flat: string,
    public postIndex: string
  ) {}
  toCreate(): CreateAddressDto {
    return {...this,typeID:this.type.id!};
  }
  toUpdate(): UpdateAddressDto {
    return {...this,typeID:this.type.id,id:this.id!};
  }
}
