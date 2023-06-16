import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { NotificationService } from 'src/modules/_shared/_services/notifications/notification.service';
import { Notification } from "../../_shared/_models/notification";
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listNotifications: Notification[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  NotificationModel: Notification = {
  } as Notification;
  NotificationDetailModel: Notification = {
  } as Notification;
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(private notiflix: NgxNotiflixService,
    private router:Router,
    private service: NotificationService) { }
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
      { field: 'content', header: 'Content' },
      { field: 'createTime', header: 'Create Time' },
    ];
    this._selectedColumns = this.cols;
  }
 
  loadData() {
    this.notiflix.showLoading();
    this.service.getAllNotifications(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listNotifications = res.result;
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

  goToAdd(){
    this.router.navigate(['notifications/create'])
  }

  update(item:Notification){
    this.router.navigate(['notifications/update'])
  }

  delete(item: Notification) {
    this.notiflix.confirm('Message', 'Do you want delete notification?', () => {
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
}
