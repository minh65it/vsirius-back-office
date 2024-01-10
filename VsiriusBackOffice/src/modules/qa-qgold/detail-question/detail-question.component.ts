import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QgoldQADTO } from 'src/modules/_shared/_models/qa-qgold/qa-qgold';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { QaQgoldService } from 'src/modules/_shared/_services/qa-qgold/qa-qgold.service';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {

  questionDetail: QgoldQADTO = {} as QgoldQADTO;
  id: string = '';
  subscription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private service: QaQgoldService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscription = this.service.currentIdQuestion.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.back();
        } else {
          this.id = res;
          this.getDetail();
        }
      }
    })
  }

  getDetail() {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(this.id).subscribe({
      next: res => {
        this.questionDetail = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.questionDetail = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  back() {
    this.router.navigate(['/qa-qgold']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
