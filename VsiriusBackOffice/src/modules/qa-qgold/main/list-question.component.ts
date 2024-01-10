import { Component, Input, OnInit } from '@angular/core';
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
  _selectedColumns: any[];
  cols: any[];
  listChoosePagination = [
    {
      key: 25,
      value: '25 results'
    },
    {
      key: 50,
      value: '50 results'
    },
    {
      key: 100,
      value: '100 results'
    },
    {
      key: 200,
      value: '200 results'
    }
  ];
  constructor(
    private router: Router,
    private service: QaQgoldService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.generateTable();
    this.loadData();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  generateTable() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'sku', header: 'SKU' },
      { field: 'customerName', header: 'Customer Name' },
      { field: 'orderQgoldId', header: 'Order Qgold Id' },
      { field: 'marketplace', header: 'Marketplace' },
      { field: 'date', header: 'date' },
    ];
    this._selectedColumns = this.cols;
  }


  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.qAQgoldSearchParam).subscribe({
      next: res => {
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
  search() {
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }
  clean() {
    this.qAQgoldSearchParam = {} as SearchQgoldQAParam;
    this.search();
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }
  detail(item: QgoldQADTO) {
    this.service.currentID(item._id);
    this.router.navigate(['/qa-qgold/detail']);
  }
  sendNewQuestion() {
    this.router.navigate(['/qa-qgold/send-mail']);
  }
  filterPagination(e: any) {
    if (e == 0) {
      e = 1
    }
    this.pagination.pageSize = e;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
