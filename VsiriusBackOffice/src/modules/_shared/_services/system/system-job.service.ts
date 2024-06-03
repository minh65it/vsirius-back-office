import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { SearchJobInfoDto } from '../../_models/system-job/search-job';
import { JobInfoDto } from '../../_models/system-job/job-info';
import { OperationResult } from '../../_helpers/operation-result';

@Injectable({
  providedIn: 'root'
})
export class SystemJobService {

  baseUrl = environment.apiSystemURL + 'JobScheduler/';
  clientId = "BackOffice";
  clientSecret = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjoiNTI1NmZlNmQtNGYzMy00NjcxLTk2ZjQtYTIwZjRhOTFlZjg5LUJhY2tPZmZpY2UiLCJuYmYiOjE2ODc1MDc1MDIsImV4cCI6MTY4NzUxMTEwMiwiaWF0IjoxNjg3NTA3NTAyfQ."

  constructor(private http: HttpClient, private router: Router) { }
  getListJobScheduler(pagination: PaginationParam, searchJobInfoDto: SearchJobInfoDto) {
    const queryParams = {
      ...pagination,
      ...searchJobInfoDto
    }
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<PaginationResult<JobInfoDto>>(this.baseUrl, { params: queryParams, headers: { clientId, clientSecret } },);
  }
  getDetail(jobId: string) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.get<JobInfoDto>(this.baseUrl + `${jobId}`, { headers: { clientId, clientSecret } });
  }
  update(model: JobInfoDto) {
    const clientId = this.clientId;
    const clientSecret = this.clientSecret;
    return this.http.put<OperationResult>(this.baseUrl + "UpdateJobClient", model, { headers: { clientId, clientSecret } });
  }
}
