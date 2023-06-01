import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { Customer } from 'src/modules/_shared/_models/customerDto';
import { CustomerService } from 'src/modules/_shared/_services/customers/customer.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listCustomers: Customer[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customCustomer = 'customer-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  numberPage = 10;
  listChoosePagination = [
    {
      key: 10,
      value: '10 Page'
    },
    {
      key: 50,
      value: '50 Page'
    },
    {
      key: 100,
      value: '100 Page'
    },
    {
      key: 200,
      value: '200 Page'
    }
  ];

  customerModelUpdate: Customer = {} as Customer;

  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  imageFile:string = '';
  constructor(private notiflix: NgxNotiflixService,
    private service: CustomerService,
    private router:Router) { }
  ngOnInit() {
    this.generateTable();
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
      { field: 'address', header: 'Address' },
      { field: 'isActive', header: 'isActive' }
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getAllCustomers(this.pagination, this.keyword).subscribe(
      {
        next: res => {
          this.listCustomers = res.result;
          this.pagination = res.pagination;
          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.error('Error');
          this.notiflix.hideLoading();
        }
      }
    )
  }
  
  // thay đổi phân trang 
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  search() {
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }


  showAdd() {
    this.router.navigate(['customer/create'])
  }

  updateShow(model: Customer) {
    this.service.paramEdit(model);
    this.router.navigate(['customer/update'])
  }

  delete(model: Customer) {
    this.notiflix.confirm('Message', 'Do you want delete Customer?', () => {
      this.notiflix.showLoading();
      this.service.delete(model).subscribe({
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
