
import { defineStore } from 'pinia'
import { Department } from '../../models/department/Department';
import {  Api } from '../../server.api';
import { CreateDepartmentDto } from './dto/create-department.dto';
type DepartmentsState = {
  loading: boolean,
  department: Department | null,
  departments:Department[]
}
export const useDepartmentsStore = defineStore('departments', {
  state: ():DepartmentsState => {
    return {
      loading: false,
      department: null,
      departments:[]
     
    }
  },
  actions: {
    setDepartment(department?: Department) {
      
      this.department = department ?? new Department('','')
    },
    async fetchDepartments() {
      this.loading = true
      await Api.shared().child('departments')
        .get<Department[]>([], Department).then(resp =>
        {
          this.departments = resp
          this.loading = false
          }
          )
},
    async saveDepartment() {
      this.loading = true
 await Api.shared().child('departments')
 .post<CreateDepartmentDto,Department>(this.department!.toCreate(),Department)
 .then(d=>{
   this.department = d
   this.departments.unshift(d)
  this.loading = false
 })
}
  }
  })

