import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { Role } from 'src/modules/_shared/_models/role';
import { User } from 'src/modules/_shared/_models/user';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { UserService } from 'src/modules/_shared/_services/users/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  urlAvatar = environment.imageURLIdentity;
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
  listRoles: Role[] = [];
  userModel: User = {
    roles: null
  } as User;
  roleName: string = '';
  @ViewChild('modalRole', { static: false }) modalRole?: ModalDirective;
  constructor(private notiflix: NgxNotiflixService,
    private service: UserService,
    private router: Router) { }
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
      { field: 'address1', header: 'address 1' },
      { field: 'address2', header: 'address 2' },
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

  update(item: User) {
    this.service.paramEdit(item);
    this.router.navigate(['users/update']);
  }
  delete(item: User) {
    this.notiflix.confirm('Message', 'Do you want delete user?', () => {
      this.notiflix.showLoading();
      this.service.delete(item).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) :
            this.notiflix.error(res.message);
          this.loadData();
          this.notiflix.hideLoading();
        },
        error: err => {
          this.notiflix.error('Error System');
          this.notiflix.hideLoading();
        }
      })
    })
  }
}
