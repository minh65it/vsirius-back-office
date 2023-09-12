import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { Employee } from 'src/modules/_shared/_models/employee';
import { Role } from 'src/modules/_shared/_models/role';
import { EmployeeService } from 'src/modules/_shared/_services/employees/employee.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listEmployees: Employee[] = [];
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
  EmployeeModel: Employee = {
    roles: null
  } as Employee;
  roleName: string = '';
  imgUrl: string = environment.imageURLIdentity;
  @ViewChild('modalRole', { static: false }) modalRole?: ModalDirective;
  constructor(private notiflix: NgxNotiflixService,
    private service: EmployeeService,
    private router: Router) { }
  ngOnInit() {
    this.generateTable()
    this.loadData();
    this.loadRole();
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
      { field: 'phone', header: 'Phone Number' },
      { field: 'address1', header: 'address 1' },
      { field: 'address2', header: 'address 2' },
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getAllEmployees(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listEmployees = res.result;
        this.listEmployees.map(x => {
          x.avatar != null ? x.avatar = this.imgUrl + x.avatar : '';
        });
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
    this.router.navigate(['/employees/create'])
  }

  update(item: Employee) {
    this.service.paramEdit(item);
    this.router.navigate(['employees/update']);
  }

  delete(item: Employee) {
    this.notiflix.confirm('Message', 'Do you want delete Employee?', () => {
      this.notiflix.showLoading();
      this.service.delete(item).subscribe({
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

  loadRole() {
    this.service.getAllRole().subscribe({
      next: res => {
        this.listRoles = res;
      },
      error: () => {

      }
    })
  }

  changeRole(e) {
    this.EmployeeModel.roles = [];
    this.EmployeeModel.roles = e;
  }

  loadDetailRole(mail) {
    this.service.getEmployeeDetail(mail).subscribe({
      next: res => {
        this.EmployeeModel.roles = res.roles;
        this.EmployeeModel.phoneNumber = this.EmployeeModel.phoneNumber?.substring(2);
        this.EmployeeModel.avatar = null;
      }
    })
  }

  role(item: Employee) {
    this.loadDetailRole(item.email);
    this.roleName = this.EmployeeModel.roles?.toString();
    this.EmployeeModel = { ...item };
    this.modalRole.show();
  }

  addRole() {
    this.notiflix.showLoading();
    this.service.update(this.EmployeeModel).subscribe({
      next: res => {
        if (res.success) {
          this.notiflix.success(res.message);
          this.modalRole?.hide();
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

  goToRoles() {
    this.router.navigate(['employees/role'])
  }
}
