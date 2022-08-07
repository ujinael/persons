import { CreateDaySchedulleDto } from "../../daySchedulles/dto/create-daySchedulle.dto";


export interface UpdateEmployerSchedulleDto {
  id:string,
  employerPositionId?:string,
  monthSchedulleId?: string,
  days?:CreateDaySchedulleDto[]
}

