import { OperationResult } from './../_helpers/operation-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../_helpers/pagination-utility';
import { LogParams } from '../_models/system-logging/logparams';
import { LogDto } from '../_models/system-logging/log';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SystemLoggingService {

  baseUrl = environment.apiSystemURL + 'Log/';
  clientId = "BackOffice";
  clientSecret = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjoiNTI1NmZlNmQtNGYzMy00NjcxLTk2ZjQtYTIwZjRhOTFlZjg5LUJhY2tPZmZpY2UiLCJuYmYiOjE2ODc1MDc1MDIsImV4cCI6MTY4NzUxMTEwMiwiaWF0IjoxNjg3NTA3NTAyfQ."

  constructor(private http: HttpClient, private router: Router) { }

  getListLog(pagination: PaginationParam, logParams: LogParams, keyword: string) {
    const queryParams = {
      ...pagination,
      ...logParams,
      keyword,
    }
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<PaginationResult<LogDto>>(this.baseUrl + 'GetListLog', { params: queryParams, headers: { clientId, clientSecret } },);
  }
  getLevelLog() {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<KeyValue<number, string>[]>(this.baseUrl + 'GetLevelLog', { headers: { clientId, clientSecret } },);
  }
  getDetail(logId: string) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<LogDto>(this.baseUrl + 'GetLog', { params: { logId }, headers: { clientId, clientSecret } });
  }
  getFilterProjectName() {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<string[]>(this.baseUrl + 'FilterProjectName', { headers: { clientId, clientSecret } });
  }
  getFilterURL(projectName: string) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<string[]>(this.baseUrl + 'FilterURL', { params: { projectName }, headers: { clientId, clientSecret } });
  }
  writeLogs(error: string, correlationId: string) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    let log: LogDto = {
      logId: "00000000-0000-0000-0000-000000000000",
      message: null,
      level: "Error",
      timeStamp: null,
      exception: error,
      url: this.router.url == '/' ? "Home Page" : this.router.url,
      projectName: "Back Office",
      correlationId: correlationId != null ? correlationId : uuid.v4()
    };
    return this.http.post<OperationResult>(this.baseUrl + 'WriteLogs', log, { headers: { clientId, clientSecret } });
  }
}
