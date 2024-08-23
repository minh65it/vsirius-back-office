import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationEbay, PaginationResultEbay } from '../../_helpers/pagination-utility';
import { EbayProcessSearchParam } from '../../_helpers/params/search-ebay-process-param';
import { EbayDto } from '../../_models/order-processor/ebay-order-Dto';

@Injectable({
  providedIn: 'root'
})
export class OrderEbayService {

  baseUrl = environment.apiEbayURL;
  IdOrder = new BehaviorSubject<string>('');
  currentIdOrder = this.IdOrder.asObservable();
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentID(id: string) {
    this.IdOrder.next(id);
  }

  getData(pagination: PaginationEbay, param: EbayProcessSearchParam) {
    return this.http.get<PaginationResultEbay<EbayDto>>(this.baseUrl + 'Order', { params: { ...pagination, ...param } });
  }

  getDetail(orderID: string) {
    return this.http.get<EbayDto>(this.baseUrl + `Order/api/order/${orderID}`, { params: { orderID } });
  }
  
}
