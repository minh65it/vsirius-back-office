import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { ReturnFBMOrderParams } from 'src/modules/_shared/_helpers/params/return-amazon';
import { ReturnFBMOrderRowDto } from 'src/modules/_shared/_models/return-orders/return-amazon';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { ReturnAmazonService } from 'src/modules/_shared/_services/return-orders/return-amazon.service';

@Component({
  selector: 'app-return-amazon',
  templateUrl: './return-amazon.component.html',
  styleUrls: ['./return-amazon.component.scss']
})
export class ReturnAmazonComponent implements OnInit {

  subscription = Subscription.EMPTY;
  returnAmazonSearchParam: ReturnFBMOrderParams = {} as ReturnFBMOrderParams;
  pagination: PaginationResult2<ReturnFBMOrderRowDto> = {
    data: [],
    pageNumber: 1,
    pageSize: 25,
    totalCount: null,
    pageCount: 1
  };
  listReturnAmazonOrder: ReturnFBMOrderRowDto[] = [];
  _selectedColumns: any[];
  cols: any[];
  searchOrderFrom: Date = new Date();
  searchOrderTo: Date = new Date();
  searchReturnRequestDateFrom: Date = new Date();
  searchReturnRequestDateTo: Date = new Date();
  listReturnRequestStatus: any[] = [
    { key: "Approved", value: 'Approved' }
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
  constructor(
    private router: Router,
    private service: ReturnAmazonService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.searchOrderFrom.setDate(this.searchOrderTo.getDate() - 45);
    this.searchReturnRequestDateFrom.setDate(this.searchReturnRequestDateTo.getDate() - 45);
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
      { field: 'orderID', header: 'Order ID' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'returnRequestDate', header: 'Return Request Date' },
      { field: 'returnRequestStatus', header: 'Return Request Status' },
      { field: 'amazonRMAID', header: 'Amazon RMAID' },
      { field: 'trackingID', header: 'Tracking ID' }
    ];
    this._selectedColumns = this.cols;
  }
  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.returnAmazonSearchParam).subscribe({
      next: res => {
        this.pagination = res;
        this.listReturnAmazonOrder = res.data;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  search() {
    this.returnAmazonSearchParam.orderDateFrom = this.searchOrderFrom?.toLocaleDateString('en-CA') ?? null;
    this.returnAmazonSearchParam.orderDateTo = this.searchOrderTo?.toLocaleDateString('en-CA') ?? null;
    this.returnAmazonSearchParam.returnRequestDateFrom = this.searchReturnRequestDateFrom?.toLocaleDateString('en-CA') ?? null;
    this.returnAmazonSearchParam.returnRequestDateTo = this.searchReturnRequestDateTo?.toLocaleDateString('en-CA') ?? null;

    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }
  getReturnOrderStatus($event: any) { }
  clean() {
    this.searchOrderTo, this.searchReturnRequestDateTo = new Date();
    this.searchOrderFrom, this.searchReturnRequestDateFrom = new Date();
    this.searchOrderFrom.setDate(new Date().getDate() - 45);
    this.searchReturnRequestDateFrom.setDate(new Date().getDate() - 45);
    this.returnAmazonSearchParam = {} as ReturnFBMOrderParams;
    this.search();
  }
  detailReturnORder(item: ReturnFBMOrderRowDto) {
    this.service.currentAmazonRMAID(item.amazonRMAID);
    this.router.navigate(['/return-orders/detail-amazon']);
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
