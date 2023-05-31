import { Component } from '@angular/core';
import { UserForLoginParam } from '../_shared/_models/authDto';
import { AuthService } from '../_shared/_services/users/auth.service';
import { Router } from '@angular/router';
import { NgxNotiflixService } from '../_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: UserForLoginParam = <UserForLoginParam>{

  }
  isShow: boolean = false;
  constructor(private authService: AuthService,
    private router: Router,
    private notiflix: NgxNotiflixService) { }
  showPassword() {
    this.isShow = !this.isShow;
  }

  login() {
    this.authService.login(this.model).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.notiflix.hideLoading();
        this.notiflix.success('Welcome to Back Office System')
      },
      error: () => {
        this.notiflix.error('Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!');
        this.notiflix.hideLoading();
      },
      complete: () => {
        this.notiflix.hideLoading();
      }
    })
  }
}
