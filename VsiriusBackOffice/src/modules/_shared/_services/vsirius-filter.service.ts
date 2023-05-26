import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../_helpers/function-utility';
import { VsiriusFilter } from '../_models/vsirius-filter';
import { PaginationParam, PaginationResult } from '../_helpers/pagination-utility';
import { OperationResult } from '../_helpers/operation-result';
import { VsiriusFilterDto } from '../_models/vsiriusFilterDto';

@Injectable({
  providedIn: 'root'
})
export class VsiriusFilterService {
  baseUrl = environment.apiURL + 'VsiriusFilter';
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  getFilters( pagination: PaginationParam, fullTextSearch: string) {
    const queryParams = {
      ...pagination,
      fullTextSearch
    }
    return this.http.get<PaginationResult<VsiriusFilterDto>>(this.baseUrl + '/GetListFilter', { params: queryParams });
  }

  create(model:VsiriusFilterDto){
    const formData = this.funUtility.ToFormData(model);
    return this.http.post<OperationResult>(this.baseUrl + '/AddFilter', formData);
  }

  delete(filterId: number) {
    return this.http.delete<OperationResult>(this.baseUrl + '/DeleteFilter', { params: { filterId } });
  }

  update(model:VsiriusFilterDto){
    const formData = this.funUtility.ToFormData(model);
    return this.http.put<OperationResult>(this.baseUrl + '/UpdateFilter' , formData);
  }

  importData(fileExcel: File) {
    const formData = new FormData();
    formData.append('fileExcel', fileExcel, fileExcel.name);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<OperationResult>(this.baseUrl + '/AddFilterByExcel', formData, { headers });
  }
}
