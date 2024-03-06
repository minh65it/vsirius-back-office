import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { listSupplier } from 'src/modules/_shared/_constants/supplier.enum';
import { Pagination, PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { WalmartOrderType, WalmartProcessSearchParam } from 'src/modules/_shared/_helpers/params/search-walmart-process-param';
import { WalmartOrderDetailDTO } from 'src/modules/_shared/_models/order-processor/walmart-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';
import { OrdersWalmartService } from 'src/modules/_shared/_services/orders-processor/orders-walmart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  walmartSearchParam: WalmartProcessSearchParam = {} as WalmartProcessSearchParam;

  listWalmartOrder: WalmartOrderDetailDTO[] = [];
  listDelete: WalmartOrderDetailDTO[] = [];
  _selectedColumns: any[];
  cols: any[];

  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 25,
  };
  searchFrom: Date = new Date();
  searchTo: Date = new Date();
  selectIsSubmitted: any[] = [
    { key: "No", value: false },
    { key: "Yes", value: true }
  ];

  isCheckAll: boolean = false;
  orderWalmartStatusOptions: any[] = [];
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
    private service: OrdersWalmartService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
  ) { }

  ngOnInit() {

    this.orderWalmartStatusOptions = Object.keys(WalmartOrderType)
      .filter(key => isNaN(Number(key))).map(key => ({ key, value: WalmartOrderType[key] }));
    this.searchFrom.setDate(this.searchTo.getDate() - 30);
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
      { field: 'purchaseOrderId', header: 'Purchase Order Id' },
      { field: 'customerOrderId', header: 'Walmart Order Id' },
      { field: 'supplier', header: 'Supplier' },
      { field: 'supplierOrderId', header: 'Supplier Order Id' },
      { field: 'trackingNumber', header: 'Tracking Number' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'methodShipping', header: 'Method Shipping' },
      { field: 'buyerName', header: 'Buyer Name' },
      { field: 'address1', header: 'Address 1' },
      { field: 'address2', header: 'Address 2' },
      { field: 'city', header: 'City' },
      { field: 'postalCode', header: 'Postal Code' },
      { field: 'items', header: 'Item List and status' },
      { field: 'isDelete', header: 'isDelete' },
    ];
    this._selectedColumns = this.cols;
  }


  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.walmartSearchParam).subscribe({
      next: res => {
        this.isCheckAll = false;
        this.pagination = res.pagination;
        this.listWalmartOrder = res.result;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  getIsSubmitted($event: any) {
    //console.log(this.walmartSearchParam);
  }

  search() {
    this.walmartSearchParam.fromDate = this.searchFrom?.toLocaleDateString('en-CA') ?? null;
    this.walmartSearchParam.toDate = this.searchTo?.toLocaleDateString('en-CA') ?? null;
    if (this.walmartSearchParam.fromDate === null || this.walmartSearchParam.toDate === null) {
      return this.notiflix.warning('Date is not null');
    }
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  detail(item: WalmartOrderDetailDTO) {
    this.service.currentID(item.purchaseOrderId);
    this.router.navigate(['orders/marketplace/detail-walmart']);
  }
  detailSupplier(item: WalmartOrderDetailDTO) {
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
    this.walmartSearchParam = {} as WalmartProcessSearchParam;
    this.search();
  }
  chooseOrder(item: WalmartOrderDetailDTO) {
    item.isDelete = !item.isDelete;
    this.listDelete = this.listWalmartOrder.filter(x => x.isDelete);
    if (this.listDelete.length > 0)
      this.isCheckAll = this.listWalmartOrder.every(rel => rel.isDelete);
    else
      this.isCheckAll = false;
  }
  checkAll() {
    this.listWalmartOrder.map(item => {
      item.isDelete = this.isCheckAll;
      return item;
    });
    this.listDelete = this.listWalmartOrder.filter(x => x.isDelete);
  }
  getOrderStatus($event: any) {
    //console.log(this.searchQgoldProcessParam);
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
