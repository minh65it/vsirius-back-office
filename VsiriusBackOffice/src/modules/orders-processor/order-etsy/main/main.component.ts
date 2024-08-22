
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Pagination, PaginationEtsy } from 'src/modules/_shared/_helpers/pagination-utility';
import { EbayProcessSearchParam } from 'src/modules/_shared/_helpers/params/search-ebay-process-param';
import { EtsyProcessSearchParam } from 'src/modules/_shared/_helpers/params/search-etsy-process-param';
import { EtsyDto } from 'src/modules/_shared/_models/order-processor/etsy-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrderEtsyService } from 'src/modules/_shared/_services/orders-processor/order-etsy.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private service: OrderEtsyService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
  ) { }
  
  
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 25,
  };
  cols: any[];
  listEtsyOrder: EtsyDto[] = [];
  pagunation : PaginationEtsy = <PaginationEtsy>{
    pageNumber: 1,
    pageSize: 25,
  };
  isCheckAll: boolean = false;
  subscription = Subscription.EMPTY;
  etsySearchParam: EtsyProcessSearchParam = {} as EtsyProcessSearchParam;

  selectIsSubmitted: any[] = [
    { key: "No", value: false },
    { key: "Yes", value: true }
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

  searchFrom : Date ;
  searchTo : Date ;

  _selectedColumns: any[];
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  ngOnInit(): void {
    //this.searchFrom.setDate(this.searchTo.getDate() - 120);
    this.generateTable();
    this.loadData();
  }

  generateTable() {
    this.cols = [
      { field: 'receipt_id', header: 'Receipt Id' },
      { field: 'created_timestamp', header: 'Created' },
      { field: 'seller_email', header: 'Seller Email' },
      { field: 'buyer_user_id', header: 'Customer Id' },
      { field: 'buyer_email', header: 'Customer Email' },
      { field: 'supplier', header: 'Supplier' },
      { field: 'name', header: 'Customer Name' },
      { field: 'formatted_address', header: 'Address' },
      { field: 'is_shipped', header: 'Ship Status' }
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagunation, this.etsySearchParam).subscribe({
      next: res => {
        this.listEtsyOrder = res['result']
        this.pagination = res['pagination'];       
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    });
  }

  submitLink() {
    this.router.navigate(['orders/supplier/submit-qgold']);
  }

  submitLinkStuller() {
    
  }

  search() {
    this.etsySearchParam.fromDate = this.searchFrom?.toLocaleDateString('en-CA') ?? '';
    this.etsySearchParam.toDate = this.searchTo?.toLocaleDateString('en-CA') ?? '';
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  clean() {
    this.searchFrom = null;
    this.searchTo = null;
    this.etsySearchParam = {} as EtsyProcessSearchParam;
    this.search();
  }

  filterPagination(e : any) {
    if (e == 0) {
      e = 1
    }
    this.pagination.pageSize = e;
    this.loadData();
  }

  detail(item : any) {
    this.service.currentID(item.receipt_id);
    this.router.navigate(['orders/marketplace/detail-etsy']);
  }

  detailSupplier(item : any) {

  }

  pageChanged(event : any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }
  convertTimeStampToDate(input : any) : string {
    const dateObj: Date = new Date(input * 1000);
    return dateObj.toDateString();
  }
  
  setSearchFrom() {
    this.searchFrom = new Date();
  }

  setSearchTo() {
    this.searchTo = new Date();
  }
}
