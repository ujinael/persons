#!/usr/local/bin/bash
echo "Название название модели"
read model

echo "Создать store?(y/n)"
read statement
# {model^}
if ![[ ${statement} == "y" ]] || ![[ ${statement} == "n" ]]; then
# exit
echo ${statement}
else
cd src/stores/models
mkdir ${model}
cd ${model}
if [[ ${statement} == "n" ]]; then
#create model
set -o noclobber
echo "
import { Type } from \"class-transformer\"
export class ${model^} {
id?:string
}
"> ${model^}.ts
exit

else
#create model
set -o noclobber
echo "
import { Type } from \"class-transformer\"
import {Create${model^}Dto} from '../../modules/${model}s/dto/create-${model}.dto'
import {Update${model^}Dto} from '../../modules/${model}s/dto/update-${model}.dto'
export class ${model^} {
id?:string

toCreate():Create${model^}Dto{
return {}

}
toUpdate():Update${model^}Dto{
return {}

}

}
" > ${model^}.ts

cd ..
cd ..
cd modules

mkdir ${model}s
cd ${model}s

#create dto
mkdir dto
cd dto
set -o noclobber
echo "

export interface Create${model^}Dto {

}
" > create-${model}.dto.ts
set -o noclobber
echo "

export interface Update${model^}Dto {

}
" > update-${model}.dto.ts

#create store

cd ..
set -o noclobber
echo "
import { defineStore } from 'pinia'
import { ${model^} } from '../../models/${model}/${model^}';
import {  Api } from '../../server.api';
type ${model^}sState = {
  loading:boolean
}
export const use${model^}sStore = defineStore('${model}s', {
  state: ():${model^}sState => {
    return {
      loading:false,
     
    }
  },
  actions: {

  }
  })
" > use${model^}sStore.ts

fi
fi