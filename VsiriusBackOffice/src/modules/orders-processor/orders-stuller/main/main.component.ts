import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { listMarketplace } from 'src/modules/_shared/_constants/marketplace.enum';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { OrderStullerStatus, SearchOrderStullerParam } from 'src/modules/_shared/_helpers/params/search-order-stuller-param';
import { StullerOrderDTO } from 'src/modules/_shared/_models/order-processor/stuller-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { OrdersStullerService } from 'src/modules/_shared/_services/orders-processor/orders-stuller.service';
import { OrdersWalmartService } from 'src/modules/_shared/_services/orders-processor/orders-walmart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  orderStullerStatusOptions: any[] = [];
  searchFrom: Date = new Date();
  searchTo: Date = new Date();
  _selectedColumns: any[];
  cols: any[];
  searchOrderStullerParam: SearchOrderStullerParam = {} as SearchOrderStullerParam;
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 25,
  };
  subscription = Subscription.EMPTY;
  listStullerOrder: StullerOrderDTO[] = [];
  listDelete: StullerOrderDTO[] = [];
  selectedMarketplace = listMarketplace;
  isCheckAll: boolean = false;

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
    private service: OrdersStullerService,
    private notiflix: NgxNotiflixService,
    private serviceAmazon: OrdersAmazonService,
    private serviceWalmart: OrdersWalmartService,
  ) { }

  ngOnInit() {
    this.orderStullerStatusOptions = Object.keys(OrderStullerStatus)
      .filter(key => isNaN(Number(key))).map(key => ({ key, value: OrderStullerStatus[key] }));
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
      { field: 'orderID', header: 'Order Stuller Id' },
      { field: 'pO', header: 'PO' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'status', header: 'Order Status' },
      { field: 'invoice', header: 'Invoice' },
      { field: 'shipDate', header: 'Ship Date' },
      { field: 'deliveryDate', header: 'Delivery Date' },
      { field: 'tracking', header: 'Tracking' },
      { field: 'items', header: 'items' },
      { field: 'address1', header: 'Address 1' },
      { field: 'buyerName', header: 'Buyer Name' },
      { field: 'shippingMethod', header: 'Shipping Method' },
      { field: 'marketplace', header: 'Marketplace' },
      { field: 'marketplaceOrderId', header: 'Marketplace Order Id' },
      { field: 'isDelete', header: 'isDelete' },
    ];
    this._selectedColumns = this.cols;
  }
  search() {
    this.searchOrderStullerParam.fromDate = this.searchFrom?.toLocaleDateString('en-CA') ?? null;
    this.searchOrderStullerParam.toDate = this.searchTo?.toLocaleDateString('en-CA') ?? null;
    if (this.searchOrderStullerParam.fromDate === null || this.searchOrderStullerParam.toDate === null) {
      return this.notiflix.warning('Date is not null');
    }
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.searchOrderStullerParam).subscribe({
      next: res => {
        this.pagination = res.pagination;
        this.listStullerOrder = res.result;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }
  clean() {
    this.searchTo = new Date();
    this.searchFrom = new Date();
    this.searchFrom.setDate(new Date().getDate() - 30);
    this.searchOrderStullerParam = {} as SearchOrderStullerParam;
    this.search();
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
  submitLink() {
    this.router.navigate(['/orders-processor/submit-qgold']);
  }
  checkAll() {
    this.listStullerOrder.map(item => {
      item.isDelete = this.isCheckAll;
      return item;
    });
    this.listDelete = this.listStullerOrder.filter(x => x.isDelete);
  }
  detail(item: StullerOrderDTO) {
    this.service.currentID(item.orderID);
    this.router.navigate(['/orders-processor/detail-stuller']);
  }
  detailMarket(item: StullerOrderDTO) {
    if (item.marketplace.includes('Amazon')) {
      this.serviceAmazon.currentID(item.marketplaceOrderId);
      this.router.navigate(['/orders-processor/detail-amazon']);
    } else if (item.marketplace.includes('Walmart')) {
      this.serviceWalmart.currentID(item.marketplaceOrderId);
      this.router.navigate(['/orders-processor/detail-walmart']);
    }
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
  chooseOrder(item: StullerOrderDTO) {
    item.isDelete = !item.isDelete;
    this.listDelete = this.listStullerOrder.filter(x => x.isDelete);
    if (this.listDelete.length > 0)
      this.isCheckAll = this.listStullerOrder.every(rel => rel.isDelete);
    else
      this.isCheckAll = false;
  }

}
