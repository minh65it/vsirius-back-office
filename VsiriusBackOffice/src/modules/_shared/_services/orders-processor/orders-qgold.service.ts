import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult, PaginationResult2 } from '../../_helpers/pagination-utility';
import { QgoldFtpOrderObject } from '../../_models/order-processor/qgold-ftp-order-object';
import { FunctionUtility } from '../../_helpers/function-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { SearchQgoldProcessParam } from '../../_helpers/params/search-qgold-process-param';
import { QgoldOrderDTO, QgoldOrderDetailDTO } from '../../_models/order-processor/qgold-order-DTO';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersQgoldService {

  baseUrl = environment.apiOrderProcessorURL;
  clientId = environment.clientIdOrderProcessor;
  clientSecret = environment.clientSecretOrderProcessor;

  IdOrder = new BehaviorSubject<string>('');
  currentIdOrder = this.IdOrder.asObservable();

  reSubmitOrder = new BehaviorSubject<QgoldFtpOrderObject>({} as QgoldFtpOrderObject);
  currentReSubmitOrder = this.reSubmitOrder.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentID(id: string) {
    this.IdOrder.next(id);
  }
  currentReOrder(model: QgoldFtpOrderObject) {
    this.reSubmitOrder.next(model);
  }

  getData(pagination: PaginationParam, param: SearchQgoldProcessParam) {
    return this.http.get<PaginationResult2<QgoldOrderDTO>>(this.baseUrl + 'QgoldProcess/GetOrders', { params: { ...pagination, ...param } });
  }
  submitOrder(model: QgoldFtpOrderObject[]) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    const formData = this.funUtility.ToFormData(model);
    return this.http.post<OperationResult>(this.baseUrl + 'SubmitOrder', formData, { headers: { clientId, clientSecret } });
  }
  callReSubmitOrder(model: QgoldFtpOrderObject[]) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    const formData = this.funUtility.ToFormData(model);
    return this.http.post<OperationResult>(this.baseUrl + 'ReSubmitOrder', formData, { headers: { clientId, clientSecret } });
  }
  getDetail(id: string) {
    return this.http.get<QgoldOrderDetailDTO>(this.baseUrl + 'QgoldProcess/Detail', { params: { id } });
  }
}
