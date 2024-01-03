import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FunctionUtility } from '../../_helpers/function-utility';
import { PaginationParam, PaginationResult2 } from '../../_helpers/pagination-utility';
import { ClaimDto } from '../../_models/return-orders/package-claim';
import { ClaimSearchParam } from '../../_helpers/params/package-claim';

@Injectable({
  providedIn: 'root'
})
export class PackageClaimService {

  baseUrl = environment.apiPackageURL;

  RMAID = new BehaviorSubject<string>('');
  currentRMAID = this.RMAID.asObservable();

  constructor(private http: HttpClient, private funUtility: FunctionUtility) { }

  currentClaimRMAID(id: string) {
    this.RMAID.next(id);
  }

  getData(pagination: PaginationParam, param: ClaimSearchParam) {
    return this.http.get<PaginationResult2<ClaimDto>>(this.baseUrl + 'Claim/GetAll', { params: { ...pagination, ...param } });
  }
  getDetail(id: string) {
    return this.http.get<ClaimDto>(this.baseUrl + 'Claim/detail', { params: { id } });
  }
}