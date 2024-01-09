import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { QgoldQADTO, SearchQgoldQAParam } from '../../_models/qa-qgold/qa-qgold';
import { PaginationParam, PaginationResult2 } from '../../_helpers/pagination-utility';

@Injectable({
  providedIn: 'root'
})
export class QaQgoldService {

  baseUrl = environment.apiOrderProcessorURL;
  clientId = environment.clientIdOrderProcessor;
  clientSecret = environment.clientSecretOrderProcessor;
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getData(pagination: PaginationParam, param: SearchQgoldQAParam) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<PaginationResult2<QgoldQADTO>>(this.baseUrl + 'QAQgold', {
      params: { ...pagination, ...param },
      headers: { clientId, clientSecret }
    });
  }
  getDetail(id: string) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<QgoldQADTO>(this.baseUrl + 'QAQgold/DetailQuestion', {
      params: { id },
      headers: { clientId, clientSecret }
    });
  }
}
