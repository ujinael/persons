import { PhoneType } from "../../../models";

export interface UpdatePhoneDto{
  id:string
  type: PhoneType
  value:string
}