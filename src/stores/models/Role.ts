export class Role{
  id?:string
  title: string
  description: string
  constructor(title: string, description: string) {
    this.title = title
    this.description = description
  }
}