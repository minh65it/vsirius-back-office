import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { Notification } from "../../_models/notification";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl = environment.apiCSRURL + 'Notifications';

  constructor(private http: HttpClient) { }

  getAllNotifications(pagination: PaginationParam, keyword: string) {
    return this.http.get<PaginationResult<Notification>>(this.baseUrl + '/GetData', { params: { ...pagination, keyword } });
  }

  create(notification: Notification) {
    return this.http.post<OperationResult>(this.baseUrl + '/Create', notification);
  }
  
  delete(id: string) {
    return this.http.delete<OperationResult>(this.baseUrl + '/Delete', { params: { id } });
  }

  update(notification: Notification) {
    return this.http.put<OperationResult>(this.baseUrl + '/Update', notification);
  }


}
