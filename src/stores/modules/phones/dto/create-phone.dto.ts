import { PhoneType } from "../../../models";

export interface CreatePhoneDto{
  type: PhoneType
  value:string
}