
import {CreatePositionDto} from '../../modules/positions/dto/create-position.dto'
import {UpdatePositionDto} from '../../modules/positions/dto/update-position.dto'
export class Position {
id?:string
  constructor(
    public title: string,
    public description: string,
    public departmentID?:string,
    public jobDescription?: string,
    ) { }
toCreate():CreatePositionDto{
return {...this,departmentID:this.departmentID!}

}
toUpdate():UpdatePositionDto{
return {...this,id:this.id!}

}

}

