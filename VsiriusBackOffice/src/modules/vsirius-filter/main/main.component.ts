import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FilterService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { VsiriusFilter } from 'src/modules/_shared/_models/vsirius-filter';
import { VsiriusFilterDto } from 'src/modules/_shared/_models/vsiriusFilterDto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { VsiriusFilterService } from 'src/modules/_shared/_services/vsirius-filter.service';

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
  filterModel: VsiriusFilterDto = {} as VsiriusFilterDto;
  filterModelUpdate: VsiriusFilterDto = {} as VsiriusFilterDto;
  @ViewChild('modalAdd', { static: false }) modalAdd?: ModalDirective;

  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;

  @ViewChild('detailModal', { static: false }) detailModal?: ModalDirective;
  @ViewChild('myForm', { static: false }) myForm?: NgForm;

  checkValidated: boolean = false;
  image: string = 'assets/images/NO-PHOTO_165x165.png';
  url: string = environment.apiURL;
  @ViewChild('imageRef') imageRef: ElementRef;
  constructor(private notiflix: NgxNotiflixService,
    private filterService: FilterService,
    private service: VsiriusFilterService) { }
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
    this.modalAdd?.show();
  }

  uploadFile(event) {
    // this.imageRef.nativeElement.attributes.src.nodeValue = this.filterModel.fileImage
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      this.filterModel.fileImage = event.target.files[0];
      //When file uploads set it to file formcontrol
      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.image = e.target.result.toString();
      };
    }
  }

  add() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.notiflix.showLoading();
      this.service.create(this.filterModel).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) : this.notiflix.error(res.message);
          this.loadData();
          this.modalAdd?.hide();
          this.clearForm();
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

  uploadFileUpdate(event) {
    // this.imageRef.nativeElement.attributes.src.nodeValue = this.filterModelUpdate.fileImage
    let reader = new FileReader(); // HTML5 FileReader API
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      this.filterModelUpdate.fileImage = event.target.files[0];
      //When file uploads set it to file formcontrol
      reader.onload = (e) => {
        // called once readAsDataURL is completed
        this.image = e.target.result.toString();
      };
    }
  }
  
  updateShow(model: VsiriusFilterDto) {
    if (model.imageURL != null) {
      this.image = this.url + this.filterModelUpdate.imageURL
    }
    this.filterModelUpdate = { ...model };
    this.modalEdit?.show();
  }

  save() {
    if (!this.filterModelUpdate.fileImage) {
      this.filterModelUpdate.fileImage = this.image;
    }
    console.log(this.filterModelUpdate);

    if (!this.checkValidated) {
      this.notiflix.showLoading();
      this.service.update(this.filterModelUpdate).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) : this.notiflix.error(res.message);
          this.loadData();
          this.modalEdit?.hide();
          this.clearForm();
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

  delete(model: VsiriusFilterDto) {
    this.notiflix.confirm('Message', 'Do you want delete filter?', () => {
      this.notiflix.showLoading();
      this.service.delete(model.fifterId).subscribe({
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

  // xóa form
  clearForm() {
    this.myForm.resetForm(
    );
    this.filterModel = <VsiriusFilterDto>{}
    this.checkValidated = false;
  }


  cancelAdd() {
    this.clearForm();
    this.modalAdd?.hide();
  }

  cancelUpdate() {
    this.clearForm();
    this.modalEdit?.hide();
  }
}
