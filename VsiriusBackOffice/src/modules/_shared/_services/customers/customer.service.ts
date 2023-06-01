import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../../_models/customerDto';
import { HttpClient } from '@angular/common/http';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiURL + 'Customer';
  CustomerSource = new BehaviorSubject<Customer>({} as Customer);
  currentCustomerSource = this.CustomerSource.asObservable();
  constructor(private http: HttpClient) { }

  paramEdit(model:Customer){
    this.CustomerSource.next(model);
  }

  getAllCustomers(pagination:PaginationParam,textSearch:string){
    return this.http.get<PaginationResult<Customer>>(this.baseUrl + '/GetAllCustomer',{params:{...pagination,textSearch}});
  }

  create(customer:Customer){
    return this.http.post<OperationResult>(this.baseUrl + '/CreateCustomer', customer);
  }

  delete(customer:Customer) {
    return this.http.put<OperationResult>(this.baseUrl + '/DeleteCustomer', customer);
  }

  update(customer:Customer){
    return this.http.put<OperationResult>(this.baseUrl + '/UpdateCustomer', customer);
  }
}
