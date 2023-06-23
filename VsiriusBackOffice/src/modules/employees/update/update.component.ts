import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionUtility } from 'src/modules/_shared/_helpers/function-utility';
import { Employee } from 'src/modules/_shared/_models/employee';
import { EmployeeService } from 'src/modules/_shared/_services/employees/employee.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  userModel: Employee = {
    roles: []
  } as Employee;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: EmployeeService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.notiflix.showLoading();
    this.service.currentEmployeeSource.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.cancel();
        }
        this.userModel = res;
        this.notiflix.hideLoading();
      }
    })
  }
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    
      }
      //When file uploads set it to file formcontrol
      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.image = e.target.result.toString();
        this.userModel.avatar = this.image;
      };
    }
  
  save() {
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(this.userModel.password)) {
      this.checkValidated = true;
      this.notiflix.warning('Password no special characters');
      return;
    }
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
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
    this.router.navigate(['employees']);
  }
}
