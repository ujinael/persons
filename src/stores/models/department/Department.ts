
import { Type } from "class-transformer"
import {CreateDepartmentDto} from '../../modules/departments/dto/create-department.dto'
import {UpdateDepartmentDto} from '../../modules/departments/dto/update-department.dto'
export class Department {
  constructor(
    public title: string,
    public description: string,
    public id?: string,
  ){ }

toCreate():CreateDepartmentDto{
return {...this}
}
toUpdate():UpdateDepartmentDto{
return{...this,id:this.id!}
}

}

