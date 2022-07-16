import { Type } from 'class-transformer';
import { CreatePassportDto } from '../../modules/passports/dto/create-passport.dto';
import { UpdatePassportDto } from '../../modules/passports/dto/update-passport.dto';
export class PassportType {
  constructor(
    public title: string,
    public description: string,
    public id?: string,
  ) {}
}

export class Passport {
  id?: string;
  constructor(
   
    public seria: string,
    public number: string,
    public code: string,
    public department: string,
    public bornPlace: string,
    public dateOfIssue: string = '1999-01-01',
    public expirationDate: string = '1999-01-01',
    public personID?: string,
    public type?: PassportType,
  ) {}
  toCreate(): CreatePassportDto {
    return {
      ...this, typeID: this.type!.id!
      , personID: this.personID!
      , expirationDate: new Date(this.expirationDate)
      , dateOfIssue:new Date(this.dateOfIssue)
    };
  }
  toUpdate(): UpdatePassportDto {
    return {
      ...this
    , typeID: this.type!.id
    , expirationDate: new Date(this.expirationDate)
    , dateOfIssue:new Date(this.dateOfIssue)
    };
  }
}
