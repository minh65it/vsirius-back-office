import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QgoldFtpOrderObject } from '../../_models/order-processor/qgold-ftp-order-object';
import { HttpClient } from '@angular/common/http';
import { FunctionUtility } from '../../_helpers/function-utility';

@Injectable({
  providedIn: 'root'
})
export class OrdersWalmartService {

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

}
