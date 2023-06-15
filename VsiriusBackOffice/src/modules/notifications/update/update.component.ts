import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Notification } from "../../_shared/_models/notification";
import { Router } from '@angular/router';
import { NotificationService } from 'src/modules/_shared/_services/notifications/notification.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { NgForm } from '@angular/forms';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { User } from 'src/modules/_shared/_models/user';
import { UserService } from 'src/modules/_shared/_services/users/user.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  notificationModel: Notification = {
    isAll : true
  } as Notification;
  ckeConfig = {
    allowedContent: false,
    extraPlugins: 'divarea,',
    forcePasteAsPlainText: true,
    removePlugins: 'exportpdf',
    language: 'en',
  }
  listUsers: User[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  endDate: Date = null;
  keyword: string = '';
  userModel: User = {
    roles: null,
    isChecked : false
  } as User;
  roleName: string = '';
  isCheckAll:boolean = false;
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(private notiflix: NgxNotiflixService,
    private router: Router,
    private userService: UserService,
    private service: NotificationService) { }

  ngOnInit() {
    this.generateTable()
    this.loadData();
    // this.loadRole();
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
      { field: 'avatar', header: 'Avatar' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.userService.getAllUsers(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listUsers = res.result;
        this.listUsers.map(x=>x.isChecked = false);
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

  changeCheckAll(e){
    this.isCheckAll = this.listUsers.every(x=>x.isChecked);
    e ? this.listUsers.map(x=>x.isChecked = true) :  this.listUsers.map(x=>x.isChecked = false);
  }

  add() {
    if(this.notificationModel.isAll){
      this.notificationModel.endDate = this.endDate;
      this.notificationModel.users = [];
    }
    else{
      this.notificationModel.users = this.listUsers.filter(x=>x.isChecked).map(x=>x.id);
    }
    this.notificationModel.createBy = this.user.id;
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.create(this.notificationModel).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) : this.notiflix.error(res.message);
          this.cancel();
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

  clearForm() {
    this.myForm.resetForm(
    );
    this.checkValidated = false;
  }
  cancel() {
    this.router.navigate(['notifications']);
  }
}
