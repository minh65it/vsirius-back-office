import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { listSupplier } from 'src/modules/_shared/_constants/supplier.enum';
import { PaginationEbay } from 'src/modules/_shared/_helpers/pagination-utility';
import { EbayProcessSearchParam } from 'src/modules/_shared/_helpers/params/search-ebay-process-param';
import { EbayDto } from 'src/modules/_shared/_models/order-processor/ebay-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrderEbayService } from 'src/modules/_shared/_services/orders-processor/order-ebay.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  ebaySearchParam: EbayProcessSearchParam = {} as EbayProcessSearchParam;
  listEbayOrder: EbayDto[] = [];
  isCheckAll: boolean = false;
  _selectedColumns: any[];
  cols: any[];
  pagination: PaginationEbay = <PaginationEbay>{
    PageNumber: 1,
    PageSize: 25,
  };
  selectIsSubmitted: any[] = [
    { key: "No", value: false },
    { key: "Yes", value: true }
  ];

  subscription = Subscription.EMPTY;
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
  selectSuppliers = listSupplier;
  constructor(
    private router: Router,
    private service: OrderEbayService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
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
      { field: 'OrderId', header: 'Order Id' },
      { field: 'CustomerId', header: 'Customer Id' },
      { field: 'CustomerName', header: 'Customer Name' },
      { field: 'CustomerPhone', header: 'Customer Phone' },
      { field: 'Address1', header: 'Address 1' },
      { field: 'TrackingNo', header: 'Tracking No' },
      { field: 'OrderDetails', header: 'Order Details' },
      { field: 'City', header: 'City' },
      { field: 'StatusOrder', header: 'Status Order' },
      { field: 'OrderDate', header: 'Order Date' },
      { field: 'Supplier', header: 'Supplier' },
      { field: 'IsSubmit', header: 'Submit' },
      { field: 'isDelete', header: 'Deleted' },
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.ebaySearchParam).subscribe({
      next: res => {
        this.pagination = res.Pagination;
        this.listEbayOrder = res.Result;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    });
  }
  search() {
    this.pagination.PageNumber == 1 ? this.loadData() : this.pagination.PageNumber = 1;
  }
  submitLink() {
    this.router.navigate(['orders/supplier/submit-qgold']);
  }
  submitLinkStuller() {
    this.router.navigate(['orders/supplier/submit-stuller']);
  }
  detail(item: EbayDto) {
    this.service.currentID(item.OrderId);
    this.router.navigate(['orders/marketplace/detail-ebay']);
  }
  detailSupplier(item: EbayDto) {
    if (item.CustomerId != null) {
      //this.serviceQgold.currentID(item.supplierOrderId);
      this.router.navigate(['orders/supplier/detail-qgold']);
    }
  }
  clean() {
    this.ebaySearchParam = {} as EbayProcessSearchParam;
    this.search();
  }
  pageChanged(event: any) {
    this.pagination.PageNumber = event.page;
    this.loadData();
  }
  filterPagination(e: any) {
    if (e == 0) {
      e = 1
    }
    this.pagination.PageSize = e;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
