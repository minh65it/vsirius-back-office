import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { NgxNotiflixService } from '../ngx-notiflix.service';
import { TokenRequestParam, UserForLoginParam, UserReturned } from '../../_models/authDto';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshTokenTimeout: any;
  baseUrl = environment.apiURL + 'Auth/';
  jwtHelper = new JwtHelperService();
  currentUser: UserReturned = <UserReturned>{};
  decodedToken: any;
  private checkExpirationTime: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private notiflix: NgxNotiflixService) {
  }

  login(model: UserForLoginParam) {
    return this.http.post<any>(this.baseUrl + 'Login', model).pipe(
      tap(res => {
        if (res) {
          if (model.rememberMe) {
            localStorage.setItem('REFRESH_TOKEN', res.token);
            const expirationDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // thời gian hết hạn là sau 3 ngày
            // const expirationDate = new Date().setMinutes(new Date().getMinutes() + 3);
            localStorage.setItem('expirationTime', JSON.stringify(expirationDate));
          }
          localStorage.setItem('TOKEN', res.token);
          localStorage.setItem('USER', JSON.stringify(res.user));
          localStorage.setItem('ROLES', JSON.stringify(res.roles));
          localStorage.setItem('USERNAME', JSON.stringify(res.user.userName));
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.currentUser = res;
        }
      }),
    );
  }

  logout() {
    this.notiflix.showLoading();
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('ROLES');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('expirationTime');
    this.router.navigate(['/login']);
    this.notiflix.hideLoading();
  }

  loggedIn() {
    const token: string = localStorage.getItem('TOKEN');
    const curentUser: UserReturned = JSON.parse(localStorage.getItem('USER'));
    if (!curentUser) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUser(): number {
    return +localStorage.getItem('USER');
  }

  startCheckExpirationTime() {
    this.checkExpirationTime = setInterval(() => {
      // Lấy thời gian hiện tại và thời gian hết hạn của token từ localStorage
      const currentTime = new Date().getTime();
      const expirationTime = localStorage.getItem('expirationTime');
      // Nếu thời gian hết hạn của token đã qua thì logout
      if (expirationTime && currentTime > +expirationTime) {
        this.logout();
        // Dừng việc kiểm tra thời gian hết hạn của token
        clearInterval(this.checkExpirationTime);
      }
    }, 30 * 60 * 1000); // Kiểm tra sau mỗi 30p
  }
}
