import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination, PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { OrderQgoldStatus, SearchQgoldProcessParam } from 'src/modules/_shared/_helpers/params/search-qgold-process-param';
import { QgoldOrderDTO } from 'src/modules/_shared/_models/order-processor/qgold-order-DTO';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listQgoldOrder: QgoldOrderDTO[] = [];
  listDelete: QgoldOrderDTO[] = [];
  searchQgoldProcessParam: SearchQgoldProcessParam = {} as SearchQgoldProcessParam;
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  orderQgoldStatusOptions: any[] = [];

  searchFrom: Date = new Date();
  searchTo: Date = new Date();

  pagination: PaginationResult2<QgoldOrderDTO> = {
    data: [],
    pageNumber: 1,
    pageSize: 25,
    totalCount: null,
    pageCount: 1
  };
  cols: any[];
  selectedOrderStatus: OrderQgoldStatus | null = null;

  isCheckAll: boolean = false;
  constructor(
    private router: Router,
    private service: OrdersQgoldService,
    private notiflix: NgxNotiflixService,
    private serviceAmazon: OrdersAmazonService,
  ) { }

  ngOnInit() {
    this.orderQgoldStatusOptions = Object.keys(OrderQgoldStatus)
      .filter(key => isNaN(Number(key))).map(key => ({ key, value: OrderQgoldStatus[key] }));
    this.searchFrom.setDate(this.searchTo.getDate() - 15);
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
      { field: 'orderQgoldId', header: 'Order Qgold Id' },
      { field: 'orderStatus', header: 'Order Status' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'buyerName', header: 'Buyer Name' },
      { field: 'address1', header: 'Address 1' },
      { field: 'marketplace', header: 'Marketplace' },
      { field: 'marketOrderId', header: 'Market Order Id' },
      { field: 'items', header: 'items' },
      { field: 'total', header: 'Total' },
      { field: 'zipCode', header: 'Zip Code' },
      { field: 'tracking', header: 'Tracking' },
      { field: 'shipVia', header: 'Ship Via' },
      { field: 'isDelete', header: 'isDelete' },
    ];
    this._selectedColumns = this.cols;
  }


  loadData() {
    this.notiflix.showLoading();
    this.service.getData(this.pagination, this.searchQgoldProcessParam).subscribe({
      next: res => {
        this.isCheckAll = false;
        this.pagination = res;
        this.listQgoldOrder = res.data;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  getOrderStatus($event: any) {
    //console.log(this.searchQgoldProcessParam);
  }

  search() {
    this.searchQgoldProcessParam.fromDate = this.searchFrom?.toLocaleDateString('en-CA') ?? null;
    this.searchQgoldProcessParam.toDate = this.searchTo?.toLocaleDateString('en-CA') ?? null;

    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  detail(item: QgoldOrderDTO) {
    this.service.currentID(item.orderQgoldId);
    this.router.navigate(['/orders-processor/detail-qgold']);
  }
  detailMarket(item: QgoldOrderDTO) {
    if (item.marketplace.includes('Amazon')) {
      this.serviceAmazon.currentID(item.marketOrderId);
      this.router.navigate(['/orders-processor/detail-amazon']);
    }
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  submitLink() {
    this.router.navigate(['/orders-processor/submit-qgold']);
  }
  clean() {
    this.searchTo = new Date();
    this.searchFrom = new Date();
    this.searchFrom.setDate(new Date().getDate() - 15);
    this.searchQgoldProcessParam = {} as SearchQgoldProcessParam;
    this.search();
  }
  chooseOrder(item: QgoldOrderDTO) {
    item.isDelete = !item.isDelete;
    this.listDelete = this.listQgoldOrder.filter(x => x.isDelete);
    if (this.listDelete.length > 0)
      this.isCheckAll = this.listQgoldOrder.every(rel => rel.isDelete);
    else
      this.isCheckAll = false;
  }
  checkAll() {
    this.listQgoldOrder.map(item => {
      item.isDelete = this.isCheckAll;
      return item;
    });
    this.listDelete = this.listQgoldOrder.filter(x => x.isDelete);
  }
  deleteAll() {
    if (this.listDelete.length === 0)
      return;
    this.notiflix.confirm('Message', 'Do you want delete orders?', () => {
      this.notiflix.showLoading();
      // this.service.deleteOrder(this.listDelete).subscribe({
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
}
