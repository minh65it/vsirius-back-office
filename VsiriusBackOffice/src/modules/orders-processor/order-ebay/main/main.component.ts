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
    pageNumber: 1,
    pageSize: 25,
  };
  selectIsSubmitted: any[] = [
    { key: "No", value: false },
    { key: "Yes", value: true }
  ];
  searchFrom : Date ;
  searchTo : Date ;


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
    //this.searchFrom.setDate(this.searchTo.getDate() - 120);
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
      { field: 'orderId', header: 'Order Id' },
      { field: 'customerId', header: 'Customer Id' },
      { field: 'customerName', header: 'Customer Name' },
      { field: 'customerPhone', header: 'Customer Phone' },
      { field: 'supplier', header: 'Supplier' },
      { field: 'address1', header: 'Address 1' },
      { field: 'statusOrder', header: 'Status Order' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'isSubmit', header: 'Submit' }
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.ebaySearchParam).subscribe({
      next: res => {
        this.pagination = res.pagination; 
        this.listEbayOrder = res.result;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    });
  }
  search() {
    this.ebaySearchParam.fromDate = this.searchFrom?.toLocaleDateString('en-CA') ?? '';
    this.ebaySearchParam.toDate = this.searchTo?.toLocaleDateString('en-CA') ?? '';
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }
  submitLink() {
    this.router.navigate(['orders/supplier/submit-qgold']);
  }
  submitLinkStuller() {
    this.router.navigate(['orders/supplier/submit-stuller']);
  }
  detail(item: EbayDto) {
    this.service.currentID(item.orderId);
    this.router.navigate(['orders/marketplace/detail-ebay']);
  }
  detailSupplier(item: EbayDto) {
    if (item.customerId != null) {
      //this.serviceQgold.currentID(item.supplierOrderId);
      this.router.navigate(['orders/supplier/detail-qgold']);
    }
  }
  clean() {
    this.ebaySearchParam = {} as EbayProcessSearchParam;
    this.search();
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
  getIsSubmitted(e : Event) {

  }

  setSearchFrom() {
    this.searchFrom = new Date();
  }

  setSearchTo() {
    this.searchTo = new Date();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
