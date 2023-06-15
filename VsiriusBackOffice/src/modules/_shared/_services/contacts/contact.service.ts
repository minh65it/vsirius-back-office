import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { OperationResult } from '../../_helpers/operation-result';
import { Contact } from '../../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiCSRURL + 'Contacts';
  constructor(private http: HttpClient) { }

  getAllContacts(pagination: PaginationParam, keyword: string) {
    return this.http.get<PaginationResult<Contact>>(this.baseUrl + '/GetData', { params: { ...pagination, keyword } });
  }

  create(contact: Contact) {
    return this.http.post<OperationResult>(this.baseUrl + '/Create', contact);
  }

  delete(contact: Contact) {
    const id = contact.id;
    return this.http.delete<OperationResult>(this.baseUrl + '/Delete', { params: { id } });
  }

  update(contact: Contact) {
    return this.http.put<OperationResult>(this.baseUrl + '/Update', contact);
  }

  getDetail(id: string) {
    return this.http.get<Contact>(this.baseUrl + '/GetDetail', { params: { id } });
  }
}
