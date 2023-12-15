import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination, PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { OrderQgoldStatus, SearchQgoldProcessParam } from 'src/modules/_shared/_helpers/params/search-qgold-process-param';
import { QgoldOrderDTO } from 'src/modules/_shared/_models/order-processor/qgold-order-DTO';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listQgoldOrder: QgoldOrderDTO[] = [];
  searchQgoldProcessParam: SearchQgoldProcessParam = {} as SearchQgoldProcessParam;
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  orderQgoldStatusOptions: any[] = [];

  searchFrom: Date = new Date();
  searchTo: Date = new Date();
  keyword: string = "";

  pagination: PaginationResult2<QgoldOrderDTO> = {
    data: [],
    pageNumber: 1,
    pageSize: 25,
    totalCount: 10,
    pageCount: 1
  };
  cols: any[];
  selectedOrderStatus: OrderQgoldStatus | null = null;

  constructor(
    private router: Router,
    private service: OrdersQgoldService,
    private notiflix: NgxNotiflixService,
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
      { field: 'items', header: 'items' },
      { field: 'total', header: 'Total' },
      { field: 'zipCode', header: 'Zip Code' },
      { field: 'tracking', header: 'Tracking' },
      { field: 'shipVia', header: 'Ship Via' },
      { field: 'marketplace', header: 'Marketplace' },
    ];
    this._selectedColumns = this.cols;
  }


  loadData() {
    this.notiflix.showLoading();
    this.service.getData(this.pagination, this.searchQgoldProcessParam).subscribe({
      next: res => {
        console.log(res);

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
    console.log(this.searchQgoldProcessParam);

    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  detail(item: QgoldOrderDTO) {
    this.service.currentID(item.orderQgoldId);
    this.router.navigate(['/orders-processor/detail-qgold']);
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
}
