import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LogDto } from 'src/modules/_shared/_models/system-logging/log';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { SystemLoggingService } from 'src/modules/_shared/_services/system/system-logging.service';

@Component({
  selector: 'app-system-logging-detail',
  templateUrl: './system-logging-detail.component.html',
  styleUrls: ['./system-logging-detail.component.scss']
})
export class SystemLoggingDetailComponent implements OnInit {

  logId: string;
  dataDetail: LogDto = <LogDto>{};
  constructor(private notiflix: NgxNotiflixService,
    private systemLoggingService: SystemLoggingService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getDetail();
  }
  hideModal() {
    this.modalService.hide();
  }

  getDetail() {
    this.notiflix.showLoading();
    this.systemLoggingService.getDetail(this.logId).subscribe(
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

}
