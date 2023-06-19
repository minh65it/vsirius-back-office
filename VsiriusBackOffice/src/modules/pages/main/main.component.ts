import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { DrivenHtmlPages } from 'src/modules/_shared/_models/drivenHtmlPages';
import { DrivenHtmlPagesService } from 'src/modules/_shared/_services/drivenHtmlPages/drivenHtmlPages.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listDrivenHtmlPagess: DrivenHtmlPages[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  DrivenHtmlPagesModel: DrivenHtmlPages = {
  } as DrivenHtmlPages;
  DrivenHtmlPagesDetailModel: DrivenHtmlPages = {
  } as DrivenHtmlPages;
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(private notiflix: NgxNotiflixService,
    private router:Router,
    private service: DrivenHtmlPagesService) { }
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
      { field: 'title', header: 'Name' },
      { field: 'url', header: 'Url' },
      { field: 'description', header: 'Description' },
    ];
    this._selectedColumns = this.cols;
  }
 
  loadData() {
    this.notiflix.showLoading();
    this.service.getAllDrivenHtmlPagess(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listDrivenHtmlPagess = res.result;
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
    this.router.navigate(['drivenHtmlPagess/create'])
  }

  update(item:DrivenHtmlPages){
    this.service.paramEdit(item);
    this.router.navigate(['drivenHtmlPagess/update'])
  }

  delete(item: DrivenHtmlPages) {
    this.notiflix.confirm('Message', 'Do you want delete DrivenHtmlPages?', () => {
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
}
