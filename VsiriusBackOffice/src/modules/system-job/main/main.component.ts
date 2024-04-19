import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { SearchJobInfoDto } from 'src/modules/_shared/_models/system-job/search-job';
import { JobInfoDto } from 'src/modules/_shared/_models/system-job/job-info';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SystemJobService } from 'src/modules/_shared/_services/system/system-job.service';
import { Subscription } from 'rxjs';
import { SystemJobDetailComponent } from '../system-job-detail/system-job-detail.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  } as Pagination;
  searchJobInfoDto: SearchJobInfoDto = <SearchJobInfoDto>{};
  listJob: JobInfoDto[];
  subscription: Subscription;
  listRestartDocker = [{ key: true, value: 'Yes' }, { key: false, value: 'No' }];
  listStop = [{ key: true, value: 'Yes' }, { key: false, value: 'No' }];
  constructor(private systemJobService: SystemJobService,
    private notiflix: NgxNotiflixService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getListJob();
  }
  getListJob() {

    this.notiflix.showLoading();
    this.subscription = this.systemJobService.getListJobScheduler(this.pagination, this.searchJobInfoDto).subscribe({
      next: res => {
        this.listJob = res.result;

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
    this.pagination.pageNumber == 1 ? this.getListJob() : this.pagination.pageNumber = 1;
  }
  clear() {
    this.pagination = <Pagination>{
      pageNumber: 1
    };
    this.searchJobInfoDto = <SearchJobInfoDto>{};
    this.listJob = [];
    this.getListJob();
  }
  getDetail(jobTitle: string) {
    const initialState: ModalOptions = {
      initialState: {
        tittle: jobTitle
      },
      class: 'modal-lg',
    };
    this.modalService.show(SystemJobDetailComponent, initialState);
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getListJob();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
