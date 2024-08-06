import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationEtsy, PaginationResult } from '../../_helpers/pagination-utility';
import { EtsyDto } from '../../_models/order-processor/etsy-order-Dto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EtsyProcessSearchParam } from '../../_helpers/params/search-ebay-process-param';


@Injectable({
  providedIn: 'root'
})
export class OrderEtsyService {
  baseUrl = 'https://localhost:7045/api/Order/';
  IdOrder = new BehaviorSubject<number>(0);
  currentIdOrder = this.IdOrder.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getData(pagination: PaginationEtsy, param: EtsyProcessSearchParam) {
    
    return this.http.get<PaginationResult<EtsyDto>>(this.baseUrl + `GetAllOrder`, { params: { ...param, ...pagination } });
  }

  getDetail(receipt_id: number) {
    return this.http.get<EtsyDto>(this.baseUrl + `GetOrderDetail?orderId=${receipt_id}`);
  }

  currentID(id: number) {
    this.IdOrder.next(id);
  }
}
