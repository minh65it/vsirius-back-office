import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatePassword, User } from 'src/modules/_shared/_models/user';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { UserService } from 'src/modules/_shared/_services/users/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;
  @ViewChild('myFormPassword', { static: false }) myFormPassword?: NgForm;

  checkValidated: boolean = false;
  checkValidatedPassword: boolean = false;
  showNew: boolean = false;
  showOld: boolean = false;
  userModel: User = {
  } as User;
  formPassword: UpdatePassword = <UpdatePassword>{};
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: UserService) { }

  ngOnInit() {
    this.loadData();
    this.userModel.phoneNumber = this.userModel.phoneNumber?.substring(2);
  }
  loadData() {
    this.notiflix.showLoading();
    this.service.currentUserSource.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.cancel();
        }
        this.userModel = res;
        this.notiflix.hideLoading();
      }
    })
  }
  save() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.userModel.phoneNumber = "+1" + this.userModel.phoneNumber;
      this.service.update(this.userModel).subscribe({
        next: res => {
          if (res.success) {
            this.notiflix.success(res.message)
            this.cancel();
          }
          else {
            this.notiflix.error(res.message);
          }
          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.error('Error System');
          this.notiflix.hideLoading();
        }
      })
    }
    else {
      this.checkValidated = true;
      this.notiflix.warning('Please enter filed required');
    }
  }

  clearForm() {
    this.myForm.resetForm(
    );
    this.checkValidated = false;
  }
  cancel() {
    this.router.navigate(['users']);
  }
  updatePassword() {
    if (this.myFormPassword.valid) {
      this.checkValidatedPassword = false;
      this.notiflix.showLoading();
      this.formPassword.id = this.userModel.id;
      this.service.updatePassword(this.formPassword).subscribe({
        next: res => {
          if (res.success) {
            this.notiflix.success(res.message)
            this.cancel();
          }
          else {
            this.notiflix.error(res.message);
          }
          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.error('Error System');
          this.notiflix.hideLoading();
        }
      })
    }
    else {
      console.log(this.myFormPassword);

      this.checkValidatedPassword = true;
      this.notiflix.warning('Please enter filed required');
    }
  }
  showPassword() {
    this.showNew = !this.showNew;
  }
  showOldPassword() {
    this.showOld = !this.showOld;
  }
}
