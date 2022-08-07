import { Type } from 'class-transformer';

export class SchedulleInterval {
  id?: string;
  @Type(() => Date)
  public start: Date
  @Type(() => Date)
  public end: Date
  constructor(start: Date, end: Date) {
    this.start = start,
      this.end = end
  }
}

export class EmployerInterval extends SchedulleInterval {

  

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
export interface TimeCell extends SchedulleInterval{
  employerId:string
  class:string
  number: number
  style: {
    gridRowStart: number, gridRowEnd: number
  }
  }