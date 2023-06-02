import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { NgxNotiflixService } from '../ngx-notiflix.service';
import { TokenRequestParam, UserForLoginParam ,UserReturned} from '../../_models/authDto';
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
            localStorage.setItem('REFRESH_TOKEN', res.refreshToken);
          }
          localStorage.setItem('TOKEN', res.token);
          localStorage.setItem('USER', JSON.stringify(res.user));
          // localStorage.setItem('AVATAR', JSON.stringify(res.avartar));
          // localStorage.setItem('TYPE', JSON.stringify(res.type));
          localStorage.setItem('ROLES',JSON.stringify(res.roles));
          localStorage.setItem('USERNAME', JSON.stringify(res.user.userName));
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.currentUser = res;
          this.startRefreshTokenTimer();
        }
      }),
    );
  }

  refreshToken() {
    let refreshToken: string = localStorage.getItem('REFRESH_TOKEN');

    if (refreshToken) {
      let tokenRequest: TokenRequestParam = <TokenRequestParam>{ token: refreshToken };
      return this.http.post<UserReturned>(`${this.baseUrl}RefreshToken`, tokenRequest)
        .pipe(
          map((res) => {
            localStorage.setItem('TOKEN', res.token);
            localStorage.setItem('USER', JSON.stringify(res.userId));
            localStorage.setItem('AVATAR', JSON.stringify(res.avartar));
            localStorage.setItem('TYPE', JSON.stringify(res.type));
            localStorage.setItem('USERNAME', JSON.stringify(res.userName));
            this.decodedToken = this.jwtHelper.decodeToken(res.token);
            this.currentUser = res;
            this.startRefreshTokenTimer();
            return res;
          }));
    } else {
      return of(null);
    }
  }

  logout() {
    this.notiflix.showLoading();
    let tokenRequest: TokenRequestParam = { token: localStorage.getItem('REFRESH_TOKEN') } as TokenRequestParam;
    this.http.post<any>(`${this.baseUrl}RevokeToken`, tokenRequest).subscribe();
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('MENUS');
    localStorage.removeItem('AVATAR');
    localStorage.removeItem('TYPE');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('CUSTOMERID');
    this.stopRefreshTokenTimer();
    this.decodedToken = null;
    this.notiflix.hideLoading();
    this.router.navigate(['/login']);
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

  private startRefreshTokenTimer() {
    // Gán timeout để làm mới token trước 1 phút nó hết hạn
    const expires = new Date(this.decodedToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

}
