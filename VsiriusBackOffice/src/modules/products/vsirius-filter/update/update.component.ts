import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VsiriusFilterDto } from 'src/modules/_shared/_models/vsiriusFilterDto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { VsiriusFilterService } from 'src/modules/_shared/_services/products/vsirius-filter.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  filterModel: VsiriusFilterDto = {} as VsiriusFilterDto;
  url: string = environment.imageURL;
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: VsiriusFilterService
  ) { }
  ngOnInit() {
    this.loadDataFormUpdate();
  }
  loadDataFormUpdate() {
    let tmp = localStorage.getItem(this.service.itemProductFilter);
    if (tmp === null) {
      this.cancel();
    } else {
      this.filterModel = <VsiriusFilterDto>JSON.parse(tmp);
      this.filterModel.imageURL != null ? this.image = this.filterModel?.imageURL : this.image;
      localStorage.removeItem(this.service.itemProductFilter);
    }
  }

  selectFileImage(e: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      this.filterModel.fileImage = e.target.files[0];
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
      this.service.update(this.filterModel).subscribe({
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
  cancel() {
    this.router.navigate(['products/filter']);
  }
}
