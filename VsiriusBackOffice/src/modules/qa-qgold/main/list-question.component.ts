import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { QgoldQADTO, SearchQgoldQAParam } from 'src/modules/_shared/_models/qa-qgold/qa-qgold';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { QaQgoldService } from 'src/modules/_shared/_services/qa-qgold/qa-qgold.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {

  subscription = Subscription.EMPTY;
  pagination: PaginationResult2<QgoldQADTO> = {
    data: [],
    pageNumber: 1,
    pageSize: 25,
    totalCount: null,
    pageCount: 1
  };
  qAQgoldSearchParam: SearchQgoldQAParam = {} as SearchQgoldQAParam;
  listQAQgold: QgoldQADTO[] = [];
  constructor(
    private router: Router,
    private service: QaQgoldService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.qAQgoldSearchParam).subscribe({
      next: res => {
        console.log(res);

        this.pagination = res;
        this.listQAQgold = res.data;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

}
