import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/modules/_shared/_models/customerDto';
import { CustomerService } from 'src/modules/_shared/_services/customers/customer.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  customerModel: Customer = {} as Customer;
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: CustomerService) { }

  ngOnInit() {

  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      this.customerModel.fileImage = event.target.files[0];
      //When file uploads set it to file formcontrol
      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.image = e.target.result.toString();
      };
    }
  }

  add() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.create(this.customerModel).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) : this.notiflix.error(res.message);
          this.cancel();
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
    this.image = 'assets/images/NO-PHOTO_165x165.png';
    this.checkValidated = false;
  }
  cancel() {
    this.router.navigate(['products/filter']);
  }
}
