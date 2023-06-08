import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { OrderStatus } from '../../_models/order-status';
import { KeyValuePair } from '../../_helpers/key-value-pair';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  baseUrl = environment.apiOrderURL + 'OrderStatus';
  constructor(private http: HttpClient) { }
  
  getData(pagination:PaginationParam,keyword:string){
    return this.http.get<PaginationResult<OrderStatus>>(this.baseUrl + '/GetData',{params:{...pagination,keyword}});
  }

  create(dto:OrderStatus){
    return this.http.post<OperationResult>(this.baseUrl + '/Create', dto);
  }

  delete(id: number) {
    return this.http.delete<OperationResult>(this.baseUrl + '/Delete', { params: { id } });
  }

  update(dto:OrderStatus){
    return this.http.put<OperationResult>(this.baseUrl + '/Update', dto);
  }

  getListStatus(){
    return this.http.get<KeyValuePair[]>(this.baseUrl + '/GetListStatus');
  }
}
