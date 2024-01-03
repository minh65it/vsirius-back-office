import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination, PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { SearchReturnParam } from 'src/modules/_shared/_helpers/params/return-walmart';
import { ReturnOrder } from 'src/modules/_shared/_models/return-orders/return-walmart';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { ReturnWalmartService } from 'src/modules/_shared/_services/return-orders/return-walmart.service';

@Component({
  selector: 'app-return-walmart',
  templateUrl: './return-walmart.component.html',
  styleUrls: ['./return-walmart.component.scss']
})
export class ReturnWalmartComponent implements OnInit {

  subscription = Subscription.EMPTY;
  returnWalmartSearchParam: SearchReturnParam = {} as SearchReturnParam;
  pagination: Pagination = {} as Pagination;
  listReturnWalmartOrder: ReturnOrder[] = [];
  _selectedColumns: any[];
  cols: any[];
  listReturnStatus: any[] = [
    { key: "Initiated", value: 0 }, //INITIATED
    { key: "Delivered", value: 1 }, //DELIVERED
    { key: "Completed", value: 2 } //COMPLETED
  ];
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
  searchOrderFrom: Date = new Date();
  searchOrderTo: Date = new Date();
  constructor(
    private router: Router,
    private service: ReturnWalmartService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.searchOrderFrom.setDate(this.searchOrderTo.getDate() - 45);
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
      { field: 'returnOrderId', header: 'Return Order ID' },
      { field: 'customerName', header: 'Customer Name' },
      { field: 'customerOrderId', header: 'Customer Order ID' },
      { field: 'returnOrderDate', header: 'Return Order Date' },
      { field: 'totalRefundAmount', header: 'Total Refund Amount' },
      { field: 'returnOrderLines', header: 'Return Order Lines' },

    ];
    this._selectedColumns = this.cols;
  }
  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.returnWalmartSearchParam).subscribe({
      next: res => {
        this.pagination = res.pagination;
        this.listReturnWalmartOrder = res.result;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  search() {
    this.returnWalmartSearchParam.fromDate = this.searchOrderFrom?.toLocaleDateString('en-CA') ?? null;
    this.returnWalmartSearchParam.toDate = this.searchOrderTo?.toLocaleDateString('en-CA') ?? null;

    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }
  getReturnStatus($event: any) { }
  clean() {
    this.searchOrderTo = new Date();
    this.searchOrderFrom = new Date();
    this.searchOrderFrom.setDate(new Date().getDate() - 45);
    this.returnWalmartSearchParam = {} as SearchReturnParam;
    this.search();
  }
  detailReturnORder(item: ReturnOrder) {
    this.service.currentWalmartID(item.returnOrderId);
    this.router.navigate(['/return-orders/detail-walmart']);
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
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
