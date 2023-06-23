import { SystemLoggingDetailComponent } from './../system-logging-detail/system-logging-detail.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { LogDto } from 'src/modules/_shared/_models/system-logging/log';
import { LogParams } from 'src/modules/_shared/_models/system-logging/logparams';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { SystemLoggingService } from 'src/modules/_shared/_services/system-logging.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  logParams: LogParams = <LogParams>{};
  filterProjectName: string[] = [];
  filterUrl: string[] = [];
  listLogDto: LogDto[];
  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  } as Pagination;
  fullTextSearch: string = '';
  searchFrom: Date = null;
  searchTo: Date = null;
  maxDate: Date = new Date();
  constructor(private systemLoggingService: SystemLoggingService,
    private notiflix: NgxNotiflixService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getFilterProjectName();
  }

  getFilterProjectName() {
    this.notiflix.showLoading();
    this.systemLoggingService.getFilterProjectName().subscribe({
      next: res => {
        this.filterProjectName = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  getFilterURL() {
    this.systemLoggingService.getFilterURL(this.logParams.projectName).subscribe({
      next: res => {
        this.filterUrl = res;
      },
      error: () => {
      }
    })
  }
  changeFilterProjectName(event: any) {
    this.logParams.uRL = null;
    this.getFilterURL();
  }
  clearProjectName() {
    this.logParams.uRL = null;
    this.filterUrl = [];
  }
  changeFilterUrl(event: any) {
  }
  clearFilterUrl() {

  }

  getListLog() {
    this.logParams.timeStampFrom = this.searchFrom?.toLocaleDateString() ?? null;
    this.logParams.timeStampTo = this.searchTo?.toLocaleDateString() ?? null;
    const params: LogParams = Object.entries(Object.assign({}, this.logParams))
      .reduce((acc, [key, value]) => {
        if (value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as LogParams);

    this.notiflix.showLoading();
    this.systemLoggingService.getListLog(this.pagination, params, this.fullTextSearch).subscribe({
      next: res => {
        this.listLogDto = res.result;

        this.pagination = res.pagination;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  search() {
    this.pagination.pageNumber == 1 ? this.getListLog() : this.pagination.pageNumber = 1;
  }
  clear() {
    this.searchFrom = null;
    this.searchTo = null;
    this.pagination = <Pagination>{
      pageNumber: 1
    };
    this.logParams = <LogParams>{};
    this.listLogDto = [];
    this.fullTextSearch = '';
  }
  getDetail(logId: string) {
    const initialState: ModalOptions = {
      initialState: {
        logId: logId
      },
      class: 'modal-lg',
    };
    this.modalService.show(SystemLoggingDetailComponent, initialState);
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getListLog();
  }

}
