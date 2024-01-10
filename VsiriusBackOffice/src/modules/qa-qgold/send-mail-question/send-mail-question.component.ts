import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QgoldQADTO } from 'src/modules/_shared/_models/qa-qgold/qa-qgold';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { QaQgoldService } from 'src/modules/_shared/_services/qa-qgold/qa-qgold.service';

@Component({
  selector: 'app-send-mail-question',
  templateUrl: './send-mail-question.component.html',
  styleUrls: ['./send-mail-question.component.scss']
})
export class SendMailQuestionComponent implements OnInit {

  checkValidated: boolean = false;
  question: QgoldQADTO = {} as QgoldQADTO;
  @ViewChild('myForm', { static: false }) myForm?: NgForm;
  subscription = Subscription.EMPTY;
  constructor(
    private notiflix: NgxNotiflixService,
    private router: Router,
    private service: QaQgoldService,
  ) { }

  ngOnInit() {
  }

  sendMail() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.subscription = this.service.sendMail(this.question).subscribe({
        next: res => {
          if (!res.success) {
            this.notiflix.error(res.message);
            this.notiflix.hideLoading();
            return;
          }
          this.notiflix.success(res.message)
          this.cancel();
          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.error('Error System');
          this.notiflix.hideLoading();
        }
      })
    } else {
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
    this.router.navigate(['qa-qgold']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
