import { OrderProcessor } from '../../_models/order-processor/orderProcessor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OrderProcessorParam } from '../../_helpers/params/order-processor-param';

@Injectable({
  providedIn: 'root'
})
export class OrdersQgoldService {

  baseUrl = environment.apiOrderProcessorURL + 'Order';
  constructor(private http: HttpClient) { }

  getData(pagination: PaginationParam, param: OrderProcessorParam) {
    return this.http.get<PaginationResult<OrderProcessor>>(this.baseUrl + '/GetData', { params: { ...pagination, ...param } });
  }
}
