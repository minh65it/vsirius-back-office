import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { JobInfoDto } from 'src/modules/_shared/_models/system-job/job-info';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { SystemJobService } from 'src/modules/_shared/_services/system/system-job.service';

@Component({
  selector: 'app-system-job-detail',
  templateUrl: './system-job-detail.component.html',
  styleUrls: ['./system-job-detail.component.scss']
})
export class SystemJobDetailComponent implements OnInit {

  tittle: string;
  hour: number = 0;
  minute: number = 0;
  times: number = 0;
  dataDetail: JobInfoDto = <JobInfoDto>{};
  isEditCron: boolean = true;
  constructor(private notiflix: NgxNotiflixService,
    private systemJobService: SystemJobService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getDetail();
  }
  hideModal() {
    this.modalService.hide();
  }
  getDetail() {
    this.notiflix.showLoading();
    this.systemJobService.getDetail(this.tittle).subscribe(
      {
        next: res => {
          this.dataDetail = res;

          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.hideLoading();
        }
      }
    )
  }
  update() {
    this.notiflix.showLoading();
    this.systemJobService.update(this.dataDetail).subscribe(
      {
        next: res => {
          if (res.success) {
            this.notiflix.success("Update successful!!!");
            this.hideModal();
          } else {
            this.notiflix.error('update failed');
          }
          this.notiflix.hideLoading();
        },
        error: () => {
          this.notiflix.hideLoading();
        }
      }
    )
  }
  convertCron() {
    this.hour = this.hour ?? 0;
    this.minute = this.minute ?? 0;
    this.times = this.times ?? 0;

    this.dataDetail.cron = this.times != 0 ?
      `0 ${this.minute} ${this.hour}/${this.times} * * ?` :
      `0 ${this.minute} ${this.hour} * * ?`;
  }
}
