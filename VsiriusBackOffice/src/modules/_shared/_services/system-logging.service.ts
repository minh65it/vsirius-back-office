import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../_helpers/pagination-utility';
import { LogParams } from '../_models/system-logging/logparams';
import { LogDto } from '../_models/system-logging/log';

@Injectable({
  providedIn: 'root'
})
export class SystemLoggingService {

  baseUrl = environment.apiSystemURL + 'Log/';

  constructor(private http: HttpClient) { }

  getListLog(pagination: PaginationParam, logParams: LogParams, keyword: string) {
    const queryParams = {
      ...pagination,
      ...logParams,
      keyword,
    }
    return this.http.get<PaginationResult<LogDto>>(this.baseUrl + 'GetListLog', { params: queryParams });
  }
  getDetail(logId: string) {
    return this.http.get<LogDto>(this.baseUrl + 'GetLog', { params: { logId } });
  }
  getFilterProjectName() {
    return this.http.get<string[]>(this.baseUrl + 'FilterProjectName');
  }
  getFilterControllerName(projectName: string) {
    return this.http.get<string[]>(this.baseUrl + 'FilterControllerName', { params: { projectName } });
  }
  getFilterMethodName(projectName: string, controllerName: string) {
    const queryParams = {
      projectName,
      controllerName
    }
    return this.http.get<string[]>(this.baseUrl + 'FilterMethodName', { params: queryParams });
  }
}
