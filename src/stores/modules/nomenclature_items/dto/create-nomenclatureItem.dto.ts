import { NomenclatureType } from "../../../models/nomenclature_item/NomenclatureItem";


export interface CreateNomenclatureItemDto {
   title: string,
   shortTitle: string,
   description: string,
   type: NomenclatureType,
   measureUnitID: string,
   specialities?: string[]
   categoryId?:string
}

