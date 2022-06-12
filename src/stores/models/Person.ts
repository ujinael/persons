export class Person{
  surname: string
  name: string
  patronymic: string
  birthDate: Date
  gender: 'male' | 'female'
  constructor(surname:string,name:string,patronymic:string,birthDate:Date,gender:'male' | 'female') {
    
    this.surname = surname
    this.name = name
    this.patronymic = patronymic
    this.birthDate = birthDate
    this.gender = gender
  }
}