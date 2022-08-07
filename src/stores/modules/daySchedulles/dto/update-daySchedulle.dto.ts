

export interface UpdateDaySchedulleDto {
  id?:string
  start: Date,
   end: Date,
   employerSchedulleId: string,
   dayNumber: number,
   color?: string
}

