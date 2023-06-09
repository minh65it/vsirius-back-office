import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { OrderStatus } from 'src/modules/_shared/_models/order-status';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrderStatusService } from 'src/modules/_shared/_services/orders/order-status.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listOrderStatus: OrderStatus[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  model: OrderStatus = {
    isActive: true
  } as OrderStatus;
  modelEdit: OrderStatus = {
  } as OrderStatus;
  roleName: string = '';
  @ViewChild('modalAdd', { static: false }) modalAdd?: ModalDirective;
  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;
  @ViewChild('myForm', { static: false }) myForm?: NgForm;
  checkValidated: boolean = false;
  constructor(private notiflix: NgxNotiflixService,
    private service: OrderStatusService,
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
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'isActive', header: 'IsActive' },
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getData(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listOrderStatus = res.result;
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

  goToAdd() {
    this.modalAdd.show();
  }
  add() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.create(this.model).subscribe({
        next: res => {
          if (res.success) {
            this.notiflix.success(res.message)
            this.clearForm();
            this.modalAdd.hide();
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
    else {
      this.checkValidated = true;
      this.notiflix.warning('Please enter filed required');
    }
  }

  update(item: OrderStatus) {
    this.modelEdit = { ...item };
    this.modalEdit.show();
  }

  save() {
    this.notiflix.showLoading();
    this.service.update(this.modelEdit).subscribe({
      next: res => {
        if (res.success) {
          this.notiflix.success(res.message);
          this.clearForm();
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

  delete(item: OrderStatus) {
    this.notiflix.confirm('Message', 'Do you want delete order status?', () => {
      this.notiflix.showLoading();
      this.service.delete(item.id).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) :
            this.notiflix.error(res.message);
          this.loadData();
          this.notiflix.hideLoading();
        },
        error: err => {
          this.notiflix.error(err);
          this.notiflix.hideLoading();
        }
      })
    })
  }

  cancelUpdate() {
    this.myForm.resetForm(
    );
    this.modalEdit?.hide();
  }
  cancelAdd() {
    this.clearForm;
    this.modalAdd?.hide();
  }
  clearForm() {
    this.myForm.resetForm(
      {
        isActive:true
      }
    );
    this.model = {} as OrderStatus;
  }
}
