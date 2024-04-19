import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { SearchJobInfoDto } from 'src/modules/_shared/_models/system-job/search-job';
import { JobInfoDto } from 'src/modules/_shared/_models/system-job/job-info';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SystemJobService } from 'src/modules/_shared/_services/system/system-job.service';

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
  listJob: JobInfoDto[] = [];
  constructor(private systemJobService: SystemJobService,
    private notiflix: NgxNotiflixService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getListJob();
  }
  getListJob() {

    this.notiflix.showLoading();
    this.systemJobService.getListJobScheduler(this.pagination, this.searchJobInfoDto).subscribe({
      next: res => {
        this.listJob = res.result;
        console.log(this.listJob);

        this.pagination = res.pagination;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  search() { }
  clear() { }
  getDetail(jobTitle: string) { }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.getListJob();
  }

}
