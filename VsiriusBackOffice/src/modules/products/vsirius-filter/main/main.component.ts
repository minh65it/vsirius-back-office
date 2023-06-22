import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { VsiriusFilterDto } from 'src/modules/_shared/_models/vsiriusFilterDto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { VsiriusFilterService } from 'src/modules/_shared/_services/products/vsirius-filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listFilters: VsiriusFilterDto[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
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

  filterModelUpdate: VsiriusFilterDto = {} as VsiriusFilterDto;

  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  @ViewChild('imageRef') imageRef: ElementRef;
  imageFile:string = '';
  constructor(private notiflix: NgxNotiflixService,
    private filterService: FilterService,
    private service: VsiriusFilterService,
    private router:Router) { }
  ngOnInit() {
    this.generateTable();
    this.registerFilter();
    this.loadData();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  registerFilter() {
    this.filterService.register(
      this.customFilter,
      (value: string, filter: string): boolean => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }
        return value.toString() === filter.toString();
      }
    );
  }
  generateTable() {
    this.cols = [
      { field: 'fieldName', header: 'fieldName' },
      { field: 'labelName', header: 'labelName' },
      { field: 'value', header: 'value' },
      { field: 'productType', header: 'productType' },
      { field: 'groupName', header: 'groupName' }
    ];
    this._selectedColumns = this.cols;
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getFilters(this.pagination, this.keyword).subscribe(
      {
        next: res => {
          this.listFilters = res.result;
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

  filterPagination(e: any) {
    if (e == 0) {
      e = 1
    }
    this.pagination.pageSize = e;
    this.loadData();
  }
  // thay đổi phân trang 
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  search() {
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  onFileSelected(event: any) {
    const files: File = event.target.files[0] as File;
    this.notiflix.showLoading();
    this.service.importData(files).subscribe({
      next: res => {
        res.success ?
          this.notiflix.success(res.message)
          : this.notiflix.error(res.message);
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error(err);
        this.notiflix.hideLoading();
      }
    })
  }

  showAdd() {
    this.router.navigate(['products/filter/create'])
  }

  updateShow(model: VsiriusFilterDto) {
    this.service.paramEdit(model);
    this.router.navigate(['products/filter/update'])
  }

  delete(model: VsiriusFilterDto) {
    this.notiflix.confirm('Message', 'Do you want delete filter?', () => {
      this.notiflix.showLoading();
      this.service.delete(model.filterId).subscribe({
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
