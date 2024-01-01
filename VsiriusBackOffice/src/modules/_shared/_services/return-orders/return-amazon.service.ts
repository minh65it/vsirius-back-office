import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationParam, PaginationResult2 } from '../../_helpers/pagination-utility';
import { ReturnFBMOrderParams } from '../../_helpers/params/return-amazon';
import { ReturnFBMOrderRowDto } from '../../_models/return-orders/return-amazon';

@Injectable({
  providedIn: 'root'
})
export class ReturnAmazonService {

  baseUrl = environment.apiReturnOrderURL;
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getData(pagination: PaginationParam, param: ReturnFBMOrderParams) {
    return this.http.get<PaginationResult2<ReturnFBMOrderRowDto>>(this.baseUrl + 'ReturnOrder/GetReturnOrders', { params: { ...pagination, ...param } });
  }
}
