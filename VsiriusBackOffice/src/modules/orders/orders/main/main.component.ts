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
  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;
  checkValidated: boolean = false;
  listOrderStatus:KeyValuePair[] = [];
  constructor(private notiflix: NgxNotiflixService,
    private service: OrderService,
    private statusService:OrderStatusService,
    private router: Router) { }
  ngOnInit() {
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
      { field: 'cartId', header: 'cart code' },
      { field: 'totalQuantityItem', header: 'total Quantity' },
      { field: 'totalPrice', header: 'total price' },
      { field: 'firstName', header: 'firstName' },
      { field: 'lastName', header: 'lastName' },
      { field: 'email', header: 'email' },
      { field: 'birthDay', header: 'birthDay' },
      { field: 'address1', header: 'address1' },
      { field: 'city', header: 'city' },
      { field: 'statusName', header: 'status' },
      { field: 'createOrderDate', header: 'Order Date' },
    ];
    this._selectedColumns = this.cols;
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

  loadStatusOrder(){
    this.statusService.getListStatus().subscribe({
      next:res=>{
        this.listOrderStatus = res;
      },
      error:()=>{
        
      }
    })
  }

  update(item: VsiriusOrder) {
    this.loadStatusOrder();
    this.modelEdit = { ...item };
    this.modalEdit.show();
  }

  save() {
    this.notiflix.showLoading();
    this.service.update(this.modelEdit).subscribe({
      next: res => {
        if (res.success) {
          this.notiflix.success(res.message);
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
}
