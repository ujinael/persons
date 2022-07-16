import { ClassConstructor, plainToClass, plainToInstance } from "class-transformer";
import { useRouter } from "vue-router";
import router from "../router";
import { useGlobalStore } from "./modules/global/useGlobalStore";
// const config = require('config')
type Endpoints = "update_phone"|"add_phone"|"remove_phone" | "create_account" |
  "account" | "roles" | "api" | "auth" | "user" |
  "persons" | "departments" | "specializations" |
  "position_titles"
  | "position_types" | "phones" | "measure_units" |
  "nomenclature" | "clients"
  | "employers" | "employers" | "positions"
  | "timetable_presets" | "timetables" | "events"
  | "tasks" | "prices" | "passports" | "detail" | "paginate" | "prices" | "adresses"
  | "protocol_samples" | "protocol_sample_parameters" | "medical_protocols" | "employer_roles" | "login" | "accounts" |
  "mkb10" | "protocol_sample_parameters/tree" | "parameter_phrases" | "nomenclature_types"|
  "price_items" | "price_lists" | "currency_types"
  ;
  
export interface Query {
key: string
value:string  
}
export interface ApiError extends Error{
  status:number
}

export class Api{
  static shared = () => {
    
    // return new Api(`${import.meta.env.VITE_VAPOR}`)
        return new Api(`http://localhost:5000`)

  }
 private rootPath: string
  path:string = ''
  constructor(rootPath: string) {
    this.rootPath = rootPath
  }
  child(endpoint:Endpoints,params?:string): Api {
    this.path = this.path + `/${endpoint}`
    if (params) this.path = this.path + `/${params}`
    return this
  }
  async get<Entity>(queryParams: Array<Query> = [],constructor:any): Promise<Entity> {
    let url = new URL(`${this.rootPath}${this.path}`)
    queryParams.forEach(q => url.searchParams.append(q.key, q.value))
    const response:string =  await fetch(url.toString(),
      {
        mode:'cors',
        method: 'GET'
        , credentials: 'include'
    })
      .then(response => {        
        return this.handleResponse(response)
      })
      return await plainToInstance<Entity,string>(constructor,response)
}

async delete(query?: Query):Promise<any> {
  let url = new URL(this.rootPath + this.path)
  // url.searchParams.append(query.key,query.value)
  let request = new Request(url.toString(),{
    headers: {
     'Accept':'application/json;charset=utf-8',
     'Origin': '*',
     'Access-Control-Max-Age':'600',
    //  'Content-Type': 'application/json;charset=utf-8',
    },
    mode:'cors',
    credentials:'include',
     method: 'DELETE',
  })
  return await fetch(request)
    .then(response => {      
      return this.handleResponse(response)
    })
  

}
  async post<Save, Created>(entity: Save,constructor:any): Promise<Created> {    
      let request = new Request(this.rootPath + this.path,{
       headers: {
        'Accept':'application/json;charset=utf-8',
          'Origin': 'http://localhost:3000',
        'Access-Control-Max-Age':'600',
        'Content-Type': 'application/json;charset=utf-8',
       },
       mode:'cors',
       credentials:'include',
        method: 'POST',
       body: JSON.stringify(entity)
     }
      );
   const reponse:string = await fetch(request).then(response =>this.handleResponse(response))

    return await plainToClass(constructor,reponse)
}
async update<Update,Entity>(entity: Update,constructor:any,query?:Query):Promise<Entity> {
    let url = new URL(this.rootPath + this.path)
  if(query)
  url.searchParams.append(query.key, query.value)
      let request = new Request(url.toString(),{
       headers: {
        'Accept':'application/json;charset=utf-8',
        'Origin': '*',
        'Access-Control-Max-Age':'600',
        'Content-Type': 'application/json;charset=utf-8',
       },
       mode:'cors',
       credentials:'include',
        method: 'PUT',
       body: JSON.stringify(entity)
     }
     );
  const response:string = await fetch(request)
    .then(response => {
      return this.handleResponse(response)
    })
    return await plainToInstance<Entity,string>(constructor,response)

}
async upload<F extends FormData,Entity>(entity: F,constructor:any,query?:Query):Promise<Entity> {
  let url = new URL(this.rootPath + this.path)
if(query)
  url.searchParams.append(query.key, query.value)
  const myHeaders = new Headers();
myHeaders.append('Content-Type', 'multipart/form-data');
    let request = new Request(url.toString(),{
      // headers:myHeaders,
    //   {
    //   // 'Origin': '*',
    //   'Content-Type': 'multipart/form-data',
    //  },
     mode:'cors',
     credentials:'include',
      method: 'POST',
      body: entity
   }
   );
const response:string = await fetch(request)
  .then(response => {
    return this.handleResponse(response)
  })
  return await plainToInstance<Entity,string>(constructor,response)

}
  private handleResponse(response: Response): Promise<any> {
  
  return response.text().then(text => {
      const data = text && JSON.parse(text);
    if (!response.ok) {

          if (response.status === 401) {
              // auto logout if 401 response returned from api
            localStorage.removeItem('account');
            
              router.push('/auth')
              location.reload();
          }
        const error = (data && data.error) || response.statusText;
        const apiError: ApiError = { status: response.status, name: 'apiError', message: error };
      // const store = useGlobalStore()
      // store.setError(apiError)
        throw apiError
      }
      return data;
  });
}


}

// export const vapor = new Api(process.env.VUE_APP_VAPOR)