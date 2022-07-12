export class Login{
  login:string
  password: string
  role:string = 'admin'
  constructor(login:string, password:string) {
    this.login = login
    this.password = password
  }
}