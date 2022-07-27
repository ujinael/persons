import { Type } from 'class-transformer';
import { Employer } from '../Employer';
export class ScheduleInterval {
  id?: string;
  constructor(public start: Date, public end: Date) {}
}

export class EmployerInterval extends ScheduleInterval {
  @Type(()=>Employer)
  employer?:Employer
  constructor(
    public start: Date,
    public end: Date,
    public employerId: string,
    public month: number,
    public year:number
  ) {
    super(start, end);
  }
}
