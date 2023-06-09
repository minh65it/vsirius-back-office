import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderParam } from '../../_helpers/params/order-param';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { VsiriusOrder } from '../../_models/vsiriusOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiOrderURL + 'Order';
  constructor(private http: HttpClient) { }

  getData(pagination: PaginationParam, param: OrderParam) {
    return this.http.get<PaginationResult<VsiriusOrder>>(this.baseUrl + '/GetData', { params: { ...pagination, ...param } });
  }

  update(dto: VsiriusOrder) {
    return this.http.put<OperationResult>(this.baseUrl + '/Update', dto);
  }

  getTopOrder() {
    return this.http.get<VsiriusOrder[]>(this.baseUrl + '/GetTopOrder');
  }
  
  getTopGetOrderByUserOrder(email: string) {
    return this.http.get<VsiriusOrder>(this.baseUrl + '/GetOrderByUser', { params: { email } });
  }
}
