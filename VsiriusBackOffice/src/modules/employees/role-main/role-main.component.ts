import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Role } from 'src/modules/_shared/_models/role';
import { EmployeeService } from 'src/modules/_shared/_services/employees/employee.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { UserService } from 'src/modules/_shared/_services/users/user.service';

@Component({
  selector: 'app-role-main',
  templateUrl: './role-main.component.html',
  styleUrls: ['./role-main.component.scss']
})
export class RoleMainComponent implements OnInit {
  listRoles: Role[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];

  keyword: string = '';
  roleModel: Role = {
    claimType:[
      "Create",
      "Update",
      "Delete",
      "Read"
    ]
  } as Role;
  roleModelUpdate: Role = {
    claimType:[
      "Create",
      "Update",
      "Delete",
      "Read"
    ]
  } as Role;
  checkValidated: boolean = false;
  @ViewChild('modalAdd', { static: false }) modalAdd?: ModalDirective;

  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;

  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  constructor(private notiflix: NgxNotiflixService,
    private service: EmployeeService,
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
      // { field: 'userName', header: 'UserName' },
      // { field: 'phoneNumber', header: 'Phone Number' },
      // { field: 'address', header: 'address' },
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getAllRole().subscribe({
      next: res => {
        this.listRoles = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

  goToAdd() {
    this.modalAdd?.show();
  }

  update(item: Role) {
    this.roleModelUpdate = { ...item };
    this.modalEdit?.show();
  }
  delete(item: Role) {
    this.notiflix.confirm('Message', 'Do you want delete role?', () => {
      this.notiflix.showLoading();
      this.service.deleteRole(item.id).subscribe({
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
  add() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.createRole(this.roleModel).subscribe({
        next: res => {
          if (res.success) {
            this.notiflix.success(res.message);
            this.clearForm();
            this.loadData();
            this.modalAdd.hide();
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

  save() {
    this.notiflix.showLoading();
    this.service.updateRole(this.roleModelUpdate).subscribe({
      next: res => {
        if (res.success) {
          this.notiflix.success(res.message);
          this.loadData();
          this.modalEdit.hide();
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
  cancelUpdate() {
    this.modalEdit?.hide();
  }
  cancelAdd() {
    this.clearForm;
    this.modalAdd?.hide();
  }
  clearForm() {
    this.myForm.resetForm(
    );
    this.roleModel = {
      name: ''
    } as Role;
  }
}
