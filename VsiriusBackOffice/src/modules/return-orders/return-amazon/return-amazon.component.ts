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
  constructor(
    private router: Router,
    private service: ReturnAmazonService,
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
      { field: 'orderID', header: 'Order ID' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'returnRequestDate', header: 'Return Request Date' },
      { field: 'returnRequestStatus', header: 'Return Request Status' },
      { field: 'amazonRMAID', header: 'amazon RMAID' },
      { field: 'isDelete', header: 'isDelete' },
    ];
    this._selectedColumns = this.cols;
  }
  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.returnAmazonSearchParam).subscribe({
      next: res => {
        console.log(res);

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

}
