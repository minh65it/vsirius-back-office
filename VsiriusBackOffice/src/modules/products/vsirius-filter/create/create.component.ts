import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VsiriusFilterDto } from 'src/modules/_shared/_models/vsiriusFilterDto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { VsiriusFilterService } from 'src/modules/_shared/_services/products/vsirius-filter.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  filterModel: VsiriusFilterDto = {} as VsiriusFilterDto;
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: VsiriusFilterService) { }

  ngOnInit() {

  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      this.filterModel.fileImage = event.target.files[0];
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
      this.service.create(this.filterModel).subscribe({
        next: res => {
          if (res.success) {
            this.notiflix.success(res.message);
            this.notiflix.hideLoading();
            this.cancel();
          } else {
            this.notiflix.error(res.message);
            this.notiflix.hideLoading();
          }
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
