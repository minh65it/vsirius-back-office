import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { User } from 'src/modules/_shared/_models/user';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { UserService } from 'src/modules/_shared/_services/users/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listUsers: User[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  constructor(private notiflix: NgxNotiflixService,
    private service: UserService,
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
      { field: 'email', header: 'Email' },
      { field: 'userName', header: 'UserName' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'address', header: 'address' },
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getAllUsers(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listUsers = res.result;
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
    this.router.navigate(['/users/create'])
  }

  update(item: User) {
    this.service.paramEdit(item);
    this.router.navigate(['users/update']);
  }
  delete(item: User) {
    this.notiflix.confirm('Message', 'Do you want delete user?', () => {
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
