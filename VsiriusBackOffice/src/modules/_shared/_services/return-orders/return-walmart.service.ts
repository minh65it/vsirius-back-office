import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { ReturnOrder } from '../../_models/return-orders/return-walmart';
import { SearchReturnParam } from '../../_helpers/params/return-walmart';

@Injectable({
  providedIn: 'root'
})
export class ReturnWalmartService {

  baseUrl = environment.apiWalmartURL;

  walmartID = new BehaviorSubject<string>('');
  currentID = this.walmartID.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentWalmartID(id: string) {
    this.walmartID.next(id);
  }

  getData(pagination: PaginationParam, param: SearchReturnParam) {
    return this.http.get<PaginationResult<ReturnOrder>>(this.baseUrl + 'Order/returns', { params: { ...pagination, ...param } });
  }
  getDetail(id: string) {
    return this.http.get<ReturnOrder>(this.baseUrl + 'Order/detailreturn', { params: { id } });
  }

}
