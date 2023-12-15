import { OrderProcessor } from '../../_models/order-processor/orderProcessor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OrderProcessorParam } from '../../_helpers/params/order-processor-param';
import { QgoldFtpOrderObject } from '../../_models/order-processor/qgold-ftp-order-object';
import { FunctionUtility } from '../../_helpers/function-utility';
import { OperationResult } from '../../_helpers/operation-result';

@Injectable({
  providedIn: 'root'
})
export class OrdersQgoldService {

  baseUrl = environment.apiOrderProcessorURL;
  clientId = environment.clientIdOrderProcessor;
  clientSecret = environment.clientSecretOrderProcessor;
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getData(pagination: PaginationParam, param: OrderProcessorParam) {
    return this.http.get<PaginationResult<OrderProcessor>>(this.baseUrl + '/GetData', { params: { ...pagination, ...param } });
  }
  submitOrder(model: QgoldFtpOrderObject[]) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    const formData = this.funUtility.ToFormData(model);
    return this.http.post<OperationResult>(this.baseUrl + '/SubmitOrder', formData, { headers: { clientId, clientSecret } });
  }
}
