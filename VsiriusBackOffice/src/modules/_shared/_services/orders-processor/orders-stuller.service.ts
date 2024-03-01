import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { StullerOrderDTO } from '../../_models/order-processor/stuller-order-Dto';
import { SearchOrderStullerParam } from '../../_helpers/params/search-order-stuller-param';

@Injectable({
  providedIn: 'root'
})
export class OrdersStullerService {

  baseUrl = environment.apiStullerOrderURL;

  IdOrder = new BehaviorSubject<string>('');
  currentIdOrder = this.IdOrder.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentID(id: string) {
    this.IdOrder.next(id);
  }

  getData(pagination: PaginationParam, param: SearchOrderStullerParam) {
    return this.http.get<PaginationResult<StullerOrderDTO>>(this.baseUrl + 'StullerOrder', { params: { ...pagination, ...param } });
  }

  getDetail(orderID: string) {
    return this.http.get<StullerOrderDTO>(this.baseUrl + 'StullerOrder/Detail', { params: { orderID } });
  }
}
