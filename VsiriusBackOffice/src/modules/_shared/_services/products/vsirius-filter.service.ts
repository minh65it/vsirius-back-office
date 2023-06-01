import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { FunctionUtility } from '../../_helpers/function-utility';
import { VsiriusFilterDto } from '../../_models/vsiriusFilterDto';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';

@Injectable({
  providedIn: 'root'
})
export class VsiriusFilterService {
  baseUrl = environment.apiProductURL + 'VsiriusFilter';
  filterSource = new BehaviorSubject<VsiriusFilterDto>({} as VsiriusFilterDto);
  currentFitlterSource = this.filterSource.asObservable();
  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  paramEdit(model: VsiriusFilterDto) {
    this.filterSource.next(model);
  }

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
