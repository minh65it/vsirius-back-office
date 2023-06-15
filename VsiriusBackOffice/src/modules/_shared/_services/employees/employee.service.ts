import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { Employee } from '../../_models/employee';
import { Role } from '../../_models/role';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiURL + 'Employee';
  EmployeeSource = new BehaviorSubject<Employee>({} as Employee);
  currentEmployeeSource = this.EmployeeSource.asObservable();
  constructor(private http: HttpClient) { }

  paramEdit(model:Employee){
    this.EmployeeSource.next(model);
  }

  getAllEmployees(pagination:PaginationParam,textSearch:string){
    return this.http.get<PaginationResult<Employee>>(this.baseUrl + '/GetAllEmployee',{params:{...pagination,textSearch}});
  }

  getEmployeeDetail(mail: string){
    return this.http.get<Employee>(this.baseUrl + '/GetEmployeeDetail', { params: { mail } });
  }

  create(employee:Employee){
    return this.http.post<OperationResult>(this.baseUrl + '/CreateEmployee', employee);
  }

  delete(employee:Employee) {
    const id = employee.id;
    return this.http.delete<OperationResult>(this.baseUrl + '/DeleteEmployee',{params:{id}} );
  }

  update(employee:Employee){
    return this.http.put<OperationResult>(this.baseUrl + '/UpdateEmployee', employee);
  }
  getAllRole(){
    return this.http.get<Role[]>(this.baseUrl + '/GetAllRole');
  }

  createRole(role:Role){
    return this.http.post<OperationResult>(this.baseUrl + '/CreateRole', role);
  }

  deleteRole(id: string) {
    console.log(id);
    return this.http.delete<OperationResult>(this.baseUrl + '/DeleteRole', { params: { id } });
  }

  updateRole(role:Role){
    return this.http.put<OperationResult>(this.baseUrl + '/UpdateRole', role);
  }
}
