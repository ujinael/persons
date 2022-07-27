
import {CreateSpecialityDto} from '../../modules/specialities/dto/create-speciality.dto'
import {UpdateSpecialityDto} from '../../modules/specialities/dto/update-speciality.dto'
export class Speciality {
constructor(public title:string,public description:string, public id?:string){}
toCreate():CreateSpecialityDto{
return {...this,}

}
toUpdate():UpdateSpecialityDto{
return {...this,id:this.id!}

}

}

