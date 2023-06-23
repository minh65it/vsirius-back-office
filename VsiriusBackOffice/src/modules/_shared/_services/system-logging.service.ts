import { OperationResult } from './../_helpers/operation-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../_helpers/pagination-utility';
import { LogParams } from '../_models/system-logging/logparams';
import { LogDto } from '../_models/system-logging/log';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemLoggingService {

  baseUrl = environment.apiSystemURL + 'Log/';

  constructor(private http: HttpClient, private router: Router) { }

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
  getFilterURL(projectName: string) {
    return this.http.get<string[]>(this.baseUrl + 'FilterURL', { params: { projectName } });
  }
  writeLogs(error: string) {
    const clientId = "BackOffice";
    const clientSecret = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjoiNTI1NmZlNmQtNGYzMy00NjcxLTk2ZjQtYTIwZjRhOTFlZjg5LUJhY2tPZmZpY2UiLCJuYmYiOjE2ODc1MDc1MDIsImV4cCI6MTY4NzUxMTEwMiwiaWF0IjoxNjg3NTA3NTAyfQ."
    let log: LogDto = {
      logId: "00000000-0000-0000-0000-000000000000",
      message: null,
      level: "Error",
      timeStamp: "2023-06-23T16:27:39.219Z",
      exception: error,
      url: this.router.url,
      projectName: "Back Office",
      correlationId: "00000000-0000-0000-0000-000000000000"
    };
    return this.http.post<OperationResult>(this.baseUrl + 'WriteLogs', log, { headers: { clientId, clientSecret } });
  }
}
