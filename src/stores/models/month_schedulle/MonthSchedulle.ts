import { Type } from 'class-transformer';
import { CreateMonthSchedulleDto } from '../../modules/month_schedulles/dto/create-monthSchedulle.dto';
import { UpdateMonthSchedulleDto } from '../../modules/month_schedulles/dto/update-monthSchedulle.dto';
import { EmployerSchedulle } from '../employer_schedulle/EmployerSchedulle';
export class MonthSchedulle {
  id?: string;

  @Type(() => EmployerSchedulle)
  employerSchedulles: EmployerSchedulle[] = [];

  constructor(public month: number,public year: number) {}
  toCreate(): CreateMonthSchedulleDto {
    return {...this, employerSchedulles:undefined};
  }
  toUpdate(): UpdateMonthSchedulleDto {
    return {};
  }
}
