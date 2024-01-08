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

  // listState = [
  //   { key: 'Alabama', value: 'AL' },
  //   { key: 'Alaska', value: 'AK' },
  //   { key: 'Arizona', value: 'AZ' },
  //   { key: 'Arkansas', value: 'AR' },
  //   { key: 'California', value: 'CA' },
  //   { key: 'Colorado', value: 'CO' },
  //   { key: 'Connecticut', value: 'CT' },
  //   { key: 'Delaware', value: 'DE' },
  //   { key: 'Florida', value: 'FL' },
  //   { key: 'Georgia', value: 'GA' },
  //   { key: 'Hawaii', value: 'HI' },
  //   { key: 'Idaho', value: 'ID' },
  //   { key: 'Illinois', value: 'IL' },
  //   { key: 'Indiana', value: 'IN' },
  //   { key: 'Iowa', value: 'IA' },
  //   { key: 'Kansas', value: 'KS' },
  //   { key: 'Kentucky', value: 'KY' },
  //   { key: 'Louisiana', value: 'LA' },
  //   { key: 'Maine', value: 'ME' },
  //   { key: 'Maryland', value: 'MD' },
  //   { key: 'Massachusetts', value: 'MA' },
  //   { key: 'Michigan', value: 'MI' },
  //   { key: 'Minnesota', value: 'MN' },
  //   { key: 'Mississippi', value: 'MS' },
  //   { key: 'Missouri', value: 'MO' },
  //   { key: 'Montana', value: 'MT' },
  //   { key: 'Nebraska', value: 'NE' },
  //   { key: 'Nevada', value: 'NV' },
  //   { key: 'New Hampshire', value: 'NH' },
  //   { key: 'New Jersey', value: 'NJ' },
  //   { key: 'New Mexico', value: 'NM' },
  //   { key: 'New York', value: 'NY' },
  //   { key: 'North Carolina', value: 'NC' },
  //   { key: 'North Dakota', value: 'ND' },
  //   { key: 'Ohio', value: 'OH' },
  //   { key: 'Oklahoma', value: 'OK' },
  //   { key: 'Oregon', value: 'OR' },
  //   { key: 'Pennsylvania', value: 'PA' },
  //   { key: 'Puerto Rico', value: 'PR' },
  //   { key: 'Rhode Island', value: 'RI' },
  //   { key: 'South Carolina', value: 'SC' },
  //   { key: 'South Dakota', value: 'SD' },
  //   { key: 'Tennessee', value: 'TN' },
  //   { key: 'Texas', value: 'TX' },
  //   { key: 'Utah', value: 'UT' },
  //   { key: 'Vermont', value: 'VT' },
  //   { key: 'Virginia', value: 'VA' },
  //   { key: 'Washington', value: 'WA' },
  //   { key: 'West Virginia', value: 'WV' },
  //   { key: 'Wisconsin', value: 'WI' },
  //   { key: 'Wyoming', value: 'WY' }
  // ]
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  // getListState() {
  //   return this.listState;
  // }

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
  sendMailPackageClaimQgold(model: QgoldOrderDetailDTO) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.post<OperationResult>(this.baseUrl + 'PackageClaimQgold', model, { headers: { clientId, clientSecret } });
  }
}
