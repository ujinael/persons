import { CreatePhoneDto } from "../modules/phones/dto/create-phone.dto"
import { UpdatePhoneDto } from "../modules/phones/dto/update-phone.dto"

export enum PhoneType{
  MOBILE = 'mobile',
  CITY = 'city'
}
export class Phone{
 get phoneNumber(): string {    
  return this.value
 }

  constructor(
  public value:string,
  //  public countryCode: number,
  //  public zipCode: number,
  //  public number: number,
    public type: PhoneType,
   public id?: string) {    
  }
  toCreate():CreatePhoneDto {
    return {
      type: this.type,
      value:this.value
   }
  }
  toUpdate():UpdatePhoneDto {
    return {
      id:this.id!,
      type: this.type,
      value:this.value
   }
  }
}
