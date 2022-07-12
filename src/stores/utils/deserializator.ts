
interface Deseriazable{
  deserialize: (obj: any) => void
   
}
export class ApiModel  {

  deserialize(obj: any) {    
    for (const key in this) {
      const type = typeof this[key]
         const value = obj[key]
      if (type !== 'object' && type !== 'undefined') {
        const v = serializers[type](value)
        this[key] = v//serializers[type](value)
      }
      if (this[key] instanceof ApiModel) {
         this[key].deserialize(value)
      }
      if ((this[key] instanceof Array<ApiModel>) && Array.isArray(value)) {
        this[key] = value.map(v => {
          return Serializator.shared().deserialize(Post,v)
         })
      }
}
} 
}
class Post extends ApiModel{
  title: string = 'простой пост'
  description: string = 'с умными мыслями'
  get getTitle() {
    return this.title + ' название'
  }
}
class Human extends ApiModel{
  name: string
  surname: string
  posts: Post[]
  firstPost: Post = new Post()
  dateOfBirth:Date
  constructor() {
    super()
    this.name = ''
    this.surname = ''
    this.posts = [new Post()]
    this.dateOfBirth = new Date()
  }

}

export const serializers = {
  bigint: (b: any) => BigInt(b),
  function:(f:Function)=>f,
  string: (s: any) => `${s}`,
  number: (n: any) => +n,
  boolean: (b: any) => b===true,
  symbol:(s:any)=>Symbol(s)
}

export class Serializator{
  private static _instance:Serializator = new Serializator();
  constructor() {
      if(Serializator._instance){
          throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
      }
      Serializator._instance = this;
  }

  public static shared():Serializator
  {
      return Serializator._instance;
  }
  deserialize<T extends ApiModel>(type: { new({ ...arg }): T },object:any): T {
     const entity = new type([])
     entity.deserialize(object)
     return entity;
}
}
class A{

}
class SomeClass {

  constructor(
    { ...args },public i?:number
    
  ) { 
this.i = args['i']
  }
 }


export const test = () => {
  
  const d = (new Date()).toISOString()
  const obj = {
    name: 'Игорь'
    , surname: 'Андреев'
    ,dateOfBirth: d
    ,firstPost:{ title:'Hello',description:'World' }
    , posts: [{ title:'Hello',description:'World' }]
  }
  const h1 = Serializator.shared().deserialize(Human,obj)
  // // h1.deserialize(obj)
 Reflect.defineMetadata('className','human ',h1)
   const h =Reflect.getMetadata("name", Human)
  
}
