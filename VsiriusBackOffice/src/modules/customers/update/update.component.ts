import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/modules/_shared/_models/customerDto';
import { CustomerService } from 'src/modules/_shared/_services/customers/customer.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
  @ViewChild('myForm', { static: false }) myForm?: NgForm;
  url: string = environment.imageURL;
  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  customerModel: Customer = {} as Customer;
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: CustomerService) { }

  ngOnInit() {
    this.loadDataFormUpdate();
  }
  loadDataFormUpdate(){
    this.notiflix.showLoading();
    this.service.currentCustomerSource.subscribe({
      next:res=>{
        if(Object.keys(res).length === 0){
          this.cancel();
        }
        res.avatar != null ? this.image = this.url + res?.avatar : this.image ;
        this.customerModel = res;
        this.notiflix.hideLoading();
      },
      error:()=>{
        this.notiflix.hideLoading();
      }
    })
  }

  selectFileImage(e: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      this.customerModel.fileImage = e.target.files[0];
      //When file uploads set it to file formcontrol
      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.image = e.target.result.toString();
      };
    }
  }
  save() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.update(this.customerModel).subscribe({
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
  cancel() {
    this.router.navigate(['customer']);
  }
}
