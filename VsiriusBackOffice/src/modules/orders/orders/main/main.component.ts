import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { KeyValuePair } from 'src/modules/_shared/_helpers/key-value-pair';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { OrderParam } from 'src/modules/_shared/_helpers/params/order-param';
import { VsiriusOrder } from 'src/modules/_shared/_models/vsiriusOrder';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrderStatusService } from 'src/modules/_shared/_services/orders/order-status.service';
import { OrderService } from 'src/modules/_shared/_services/orders/order.service';
import { SignalRService } from 'src/modules/_shared/_services/signalR.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listVsiriusOrder: VsiriusOrder[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  model: VsiriusOrder = {
  } as VsiriusOrder;
  modelEdit: VsiriusOrder = {
  } as VsiriusOrder;
  roleName: string = '';
  param: OrderParam = {
    startDate: '',
    endDate: '',
    keyword: ''
  }
  searchFrom: Date = null;
  searchTo: Date = null;
  createOrderDate: Date = null;
  birthDay: Date = null;
  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;
  checkValidated: boolean = false;
  listOrderStatus: KeyValuePair[] = [];
  chooseValueStatus: any;
  constructor(private notiflix: NgxNotiflixService,
    private service: OrderService,
    private router: Router,
    private statusService: OrderStatusService,
    private serviceSignalR: SignalRService) { }
  ngOnInit() {
    this.loadNotification();
    this.generateTable()
    this.loadData();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  generateTable() {
    this.cols = [
      { field: 'orderId', header: 'Order ID' },
      { field: 'fullName', header: 'full Name' },
      { field: 'email', header: 'email' },
      { field: 'address1', header: 'address 1' },
      { field: 'city', header: 'city' },
      { field: 'totalQuantityItem', header: 'total Quantity' },
      { field: 'totalPrice', header: 'total price' },
      { field: 'statusName', header: 'status' },
      { field: 'createOrderDate', header: 'Order Date' },
    ];
    this._selectedColumns = this.cols;
  }

  loadNotification() {
    this.serviceSignalR.notificationChangedEmitter.subscribe(res => {
      if (res != null) {
        this.loadData();
      }
    })
  }

  loadData() {
    if (this.searchFrom != null)
      this.param.startDate = this.searchFrom.toDateString();
    if (this.searchTo != null)
      this.param.endDate = this.searchTo.toDateString();

    this.notiflix.showLoading();
    this.service.getData(this.pagination, this.param).subscribe({
      next: res => {
        this.listVsiriusOrder = res.result;
        this.pagination = res.pagination;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  // thay đổi phân trang 
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  search() {
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  loadStatusOrder(id) {
    this.statusService.getListStatus().subscribe({
      next: res => {
        this.listOrderStatus = res;
        this.chooseValueStatus = this.listOrderStatus[this.listOrderStatus.findIndex(x => x.key == id)];
      },
      error: () => {

      }
    })
  }

  update(item: VsiriusOrder) {
    this.loadStatusOrder(item.statusId);
    this.createOrderDate = new Date(item.createOrderDate);
    this.birthDay = new Date(item.birthDay);
    this.getDetail(item.orderId);
    this.modalEdit.show();
  }
  getDetail(orderId: string) {
    this.service.getDetail(orderId).subscribe({
      next: (res) => {
        this.modelEdit = res;
      },
      error: () => { }
    });
  }

  save() {
    this.modelEdit.statusId = this.chooseValueStatus.key;
    this.notiflix.showLoading();
    this.service.update(this.modelEdit).subscribe({
      next: res => {
        if (res.success) {
          this.notiflix.success(res.message);
          //location.reload();
          this.modalEdit.hide();
          this.loadData();
        }
        else {
          this.notiflix.error(res.message);
        }
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  goToOrderStatus() {
    this.router.navigate(['orders/marketplace/order-status-vsirius'])
  }
  detail(item : string) {
    this.service.currentID(item['orderId']);
    this.router.navigate(['orders/marketplace/order-detail']);
  }
}
