

export interface UpdateAddressDto {
  id:string,
  typeID?: string,
  country?: string,
  region?: string,
  city?: string,
  district?: string,
  street?: string,
  house?: string,
  corpus?: string,
  flat?: string,
  registrationDate?:Date,
  postIndex?: string
}

