import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParam, PaginationResult } from '../../_helpers/pagination-utility';
import { User } from '../../_models/user';
import { OperationResult } from '../../_helpers/operation-result';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../../_models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiURL + 'User';
  userSource = new BehaviorSubject<User>({} as User);
  currentUserSource = this.userSource.asObservable();
  constructor(private http: HttpClient) { }

  paramEdit(model:User){
    this.userSource.next(model);
  }

  getAllUsers(pagination:PaginationParam,textSearch:string){
    return this.http.get<PaginationResult<User>>(this.baseUrl + '/GetAllUser',{params:{...pagination,textSearch}});
  }

  create(user:User){
    return this.http.post<OperationResult>(this.baseUrl + '/CreateUser', user);
  }

  delete(user:User) {
    return this.http.put<OperationResult>(this.baseUrl + '/DeleteUser', user);
  }

  update(user:User){
    return this.http.put<OperationResult>(this.baseUrl + '/UpdateUser', user);
  }

  getUserDetail(mail: string){
    return this.http.get<User>(this.baseUrl + '/getUserDetail', { params: { mail } });
  }
}
