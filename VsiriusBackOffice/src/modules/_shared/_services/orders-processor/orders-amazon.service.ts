import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { AmazonProcessSearchParam } from '../../_helpers/params/search-amazon-process-param';
import { PaginationParam, PaginationResult2 } from '../../_helpers/pagination-utility';
import { AmazonOrderDTO, AmazonOrderDetailDTO } from '../../_models/order-processor/amzon-order-Dto';

@Injectable({
  providedIn: 'root'
})
export class OrdersAmazonService {

  baseUrl = environment.apiAmazonURL;
  clientId = environment.clientIdOrderProcessor;
  clientSecret = environment.clientSecretOrderProcessor;

  IdOrder = new BehaviorSubject<string>('');
  currentIdOrder = this.IdOrder.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentID(id: string) {
    this.IdOrder.next(id);
  }

  getData(pagination: PaginationParam, param: AmazonProcessSearchParam) {
    return this.http.get<PaginationResult2<AmazonOrderDTO>>(this.baseUrl + 'OrderAmazonProcessor/GetOrders', { params: { ...pagination, ...param } });
  }

  getDetail(sellerOrderId: string) {
    return this.http.get<AmazonOrderDetailDTO>(this.baseUrl + 'OrderAmazonProcessor/GetDetailOrder', { params: { sellerOrderId } });
  }

}
