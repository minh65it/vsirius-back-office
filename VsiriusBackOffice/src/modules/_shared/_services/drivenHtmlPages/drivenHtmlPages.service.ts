import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { DrivenHtmlPages } from '../../_models/drivenHtmlPages';
import { OperationResult } from '../../_helpers/operation-result';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrivenHtmlPagesService {
  baseUrl = environment.apiCSRURL + 'DrivenHtmlPages';
  DrivenHtmlPagesSource = new BehaviorSubject<DrivenHtmlPages>({} as DrivenHtmlPages);
  currentDrivenHtmlPagesSource = this.DrivenHtmlPagesSource.asObservable();
  constructor(private http: HttpClient) { }

  paramEdit(model:DrivenHtmlPages){
    this.DrivenHtmlPagesSource.next(model);
  }
  getAllDrivenHtmlPagess(pagination: PaginationParam, searchText: string) {
    return this.http.get<PaginationResult<DrivenHtmlPages>>(this.baseUrl , { params: { ...pagination, searchText } });
  }

  create(DrivenHtmlPages: DrivenHtmlPages) {
    return this.http.post<OperationResult>(this.baseUrl + '/Create', DrivenHtmlPages);
  }
  
  delete(id: DrivenHtmlPages) {
    return this.http.put<OperationResult>(this.baseUrl + '/Delete', id);
  }

  update(DrivenHtmlPages: DrivenHtmlPages) {
    return this.http.put<OperationResult>(this.baseUrl + '/Update', DrivenHtmlPages);
  }

}
