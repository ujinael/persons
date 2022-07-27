
import {CreateNomenclatureItemDto} from '../../modules/nomenclature_items/dto/create-nomenclatureItem.dto'
import {UpdateNomenclatureItemDto} from '../../modules/nomenclature_items/dto/update-nomenclatureItem.dto'
import { Data, DataTree } from '../DataTree'
import { MeasureUnit } from '../measure_unit/MeasureUnit'
import { Speciality } from '../speciality/Speciality'
export enum NomenclatureType{
PRODUCT = 'product',
SERVICE = 'service',
MEDICAL_SERVICE = 'medical_service'
}
export class NomenclatureItem implements Data{
id?:string
  constructor(
    public title: string,
    public shortTitle: string,
    public description: string,
    public type: NomenclatureType,
    public category:DataTree<Data>,
    public measureUnit?: MeasureUnit,
    public specialities?: Speciality[],
    public categoryId?:string
  ) {
}
toCreate():CreateNomenclatureItemDto{
  return {
    ...this, measureUnitID: this.measureUnit!.id!
    , specialities: this.specialities?.map(s => s.id!)
    , categoryId:this.category.id
  }

}
toUpdate():UpdateNomenclatureItemDto{
return {}

}

}

