export interface CreateAddressDto {
  typeID: string,
  personID:string,
  country: string,
  region: string,
  city: string,
  district: string,
  street: string,
  house: string,
  corpus: string,
  flat: string,
  registrationDate:Date,
  postIndex?: string

}
