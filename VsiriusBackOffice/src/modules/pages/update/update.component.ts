import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DrivenHtmlPages } from 'src/modules/_shared/_models/drivenHtmlPages';
import { DrivenHtmlPagesService } from 'src/modules/_shared/_services/drivenHtmlPages/drivenHtmlPages.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  DrivenHtmlPagesModel: DrivenHtmlPages = {
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
    this.loadData();
  }
  loadData(){
    this.notiflix.showLoading();
    this.service.currentDrivenHtmlPagesSource.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.cancel();
        }
        this.DrivenHtmlPagesModel = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  save() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.update(this.DrivenHtmlPagesModel).subscribe({
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
