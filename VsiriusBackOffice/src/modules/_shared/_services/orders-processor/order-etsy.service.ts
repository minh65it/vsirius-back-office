import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationEtsy, PaginationResult } from '../../_helpers/pagination-utility';
import { EtsyDto } from '../../_models/order-processor/etsy-order-Dto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { EtsyProcessSearchParam } from '../../_helpers/params/search-etsy-process-param';


@Injectable({
  providedIn: 'root'
})
export class OrderEtsyService {
  baseUrl = environment.apiEtsyURL;
  IdOrder = new BehaviorSubject<number>(0);
  currentIdOrder = this.IdOrder.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getData(pagination: PaginationEtsy, param: EtsyProcessSearchParam) {
    console.log(this.baseUrl);
    
    return this.http.get<PaginationResult<EtsyDto>>('https://localhost:7045/api/' + `Order/GetAllOrder`, { params: { ...pagination, ...param } });
  }

  getDetail(receipt_id: number) {
    return this.http.get<EtsyDto>(this.baseUrl + `Order/GetOrderDetail?orderId=${receipt_id}`);
  }

  currentID(id: number) {
    this.IdOrder.next(id);
  }
}
