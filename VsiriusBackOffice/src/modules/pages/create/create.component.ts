import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DrivenHtmlPages } from 'src/modules/_shared/_models/drivenHtmlPages';
import { DrivenHtmlPagesService } from 'src/modules/_shared/_services/drivenHtmlPages/drivenHtmlPages.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  DrivenHtmlPagesModel: DrivenHtmlPages = {
    isShow: true
  } as DrivenHtmlPages;
  ckeConfig = {
    allowedContent: false,
    extraPlugins: 'divarea,',
    forcePasteAsPlainText: true,
    removePlugins: 'exportpdf',
    language: 'en',
  }
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private service: DrivenHtmlPagesService) { }

  ngOnInit() {
    
  }

  add() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.create(this.DrivenHtmlPagesModel).subscribe({
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
    this.checkValidated = false;
  }
  cancel() {
    this.router.navigate(['drivenHtmlPagess']);
  }
}
