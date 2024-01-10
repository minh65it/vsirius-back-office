import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { QgoldQADTO, SearchQgoldQAParam } from '../../_models/qa-qgold/qa-qgold';
import { PaginationParam, PaginationResult2 } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QaQgoldService {

  baseUrl = environment.apiOrderProcessorURL;
  clientId = environment.clientIdOrderProcessor;
  clientSecret = environment.clientSecretOrderProcessor;

  IdQuestion = new BehaviorSubject<string>('');
  currentIdQuestion = this.IdQuestion.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentID(id: string) {
    this.IdQuestion.next(id);
  }

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
  sendMail(question: QgoldQADTO) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.post<OperationResult>(this.baseUrl + 'QAQgold', question,
      { headers: { clientId, clientSecret } });
  }
}
