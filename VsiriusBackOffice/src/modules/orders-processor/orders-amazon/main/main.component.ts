import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { listSupplier } from 'src/modules/_shared/_constants/supplier.enum';
import { PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { AmazonProcessSearchParam } from 'src/modules/_shared/_helpers/params/search-amazon-process-param';
import { AmazonOrderDTO } from 'src/modules/_shared/_models/order-processor/amzon-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  amazonSearchParam: AmazonProcessSearchParam = {} as AmazonProcessSearchParam;

  listAmazonOrder: AmazonOrderDTO[] = [];
  listDelete: AmazonOrderDTO[] = [];
  _selectedColumns: any[];
  cols: any[];

  pagination: PaginationResult2<AmazonOrderDTO> = {
    data: [],
    pageNumber: 1,
    pageSize: 25,
    totalCount: null,
    pageCount: 1
  };
  searchFrom: Date = new Date();
  searchTo: Date = new Date();
  selectIsSubmitted: any[] = [
    { key: "No", value: false },
    { key: "Yes", value: true }
  ];

  isCheckAll: boolean = false;
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
    private service: OrdersAmazonService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
  ) { }

  ngOnInit() {

    //this.searchFrom.setDate(this.searchTo.getDate() - 30);
    this.generateTable();
    this.search();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  generateTable() {
    this.cols = [
      { field: 'amazonOrderId', header: 'Amazon Order Id' },
      { field: 'supplier', header: 'Supplier' },
      { field: 'supplierOrderId', header: 'Supplier Order Id' },
      { field: 'isSubmitted', header: 'Submitted' },
      { field: 'orderStatus', header: 'Order Status' },
      { field: 'purchaseDate', header: 'Purchase Date' },
      { field: 'buyerName', header: 'Buyer Name' },
      { field: 'addressLine1', header: 'Address Line 1' },
      { field: 'addressLine2', header: 'Address Line 2' },
      { field: 'addressLine3', header: 'Address Line 3' },
      { field: 'city', header: 'City' },
      { field: 'stateOrRegion', header: 'State Or Region' },
      { field: 'postalCode', header: 'Postal Code' },
      { field: 'phone', header: 'Phone' },
      { field: 'orderItemList', header: 'Order Item List' },
      { field: 'isDelete', header: 'isDelete' },
    ];
    this._selectedColumns = this.cols;
  }


  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.amazonSearchParam).subscribe({
      next: res => {
        this.isCheckAll = false;
        this.pagination = res;
        this.listAmazonOrder = res.data; console.log(this.listAmazonOrder);
        
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  getIsSubmitted($event: any) {
    //console.log(this.amazonSearchParam);
  }

  search() {
    //this.amazonSearchParam.fromDate = this.searchFrom?.toLocaleDateString('en-CA') ?? null;
    //this.amazonSearchParam.toDate = this.searchTo?.toLocaleDateString('en-CA') ?? null;
    if (this.amazonSearchParam.fromDate === null || this.amazonSearchParam.toDate === null) {
      return this.notiflix.warning('Date is not null');
    }
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  detail(item: AmazonOrderDTO) {
    this.service.currentID(item.amazonOrderId);
    this.router.navigate(['orders/marketplace/detail-amazon']);
  }
  detailSupplier(item: AmazonOrderDTO) {
    if (item.supplierOrderId != null) {
      this.serviceQgold.currentID(item.supplierOrderId);
      this.router.navigate(['orders/supplier/detail-qgold']);
    }
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  submitLink() {
    this.router.navigate(['orders/supplier/submit-qgold']);
  }
  clean() {
    this.searchTo = new Date();
    this.searchFrom = new Date();
    this.searchFrom.setDate(new Date().getDate() - 30);
    this.amazonSearchParam = {} as AmazonProcessSearchParam;
    this.search();
  }
  chooseOrder(item: AmazonOrderDTO) {
    item.isDelete = !item.isDelete;
    this.listDelete = this.listAmazonOrder.filter(x => x.isDelete);
    if (this.listDelete.length > 0)
      this.isCheckAll = this.listAmazonOrder.every(rel => rel.isDelete);
    else
      this.isCheckAll = false;
  }
  checkAll() {
    this.listAmazonOrder.map(item => {
      item.isDelete = this.isCheckAll;
      return item;
    });
    this.listDelete = this.listAmazonOrder.filter(x => x.isDelete);
  }
  deleteAll() {
    if (this.listDelete.length === 0)
      return;
    this.notiflix.confirm('Message', 'Do you want delete orders?', () => {
      this.notiflix.showLoading();
      //this.subscription = this.service.deleteOrder(this.listDelete).subscribe({
      //   next: res => {
      //     res.success ? this.notiflix.success(res.message) :
      //       this.notiflix.error(res.message);
      //     this.loadData();
      //     this.notiflix.hideLoading();
      //   },
      //   error: err => {
      //     this.notiflix.error(err);
      //     this.notiflix.hideLoading();
      //   }
      // })
    })
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
