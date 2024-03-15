import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ClaimDto } from 'src/modules/_shared/_models/return-orders/package-claim';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { PackageClaimService } from 'src/modules/_shared/_services/return-orders/package-claim.service';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {

  claimDto: ClaimDto = {} as ClaimDto;
  rMA: string = '';
  subscription = Subscription.EMPTY;
  modalRef?: BsModalRef;
  constructor(
    private router: Router,
    private service: PackageClaimService,
    private notiflix: NgxNotiflixService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.subscription = this.service.currentRMAID.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.back();
        } else {
          this.rMA = res;
          this.getDetail();
        }
      }
    })
  }
  getDetail() {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(this.rMA).subscribe({
      next: res => {
        this.claimDto = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.claimDto = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  back() {
    this.router.navigate(['orders/package-claim']);
  }
  openModal(template: TemplateRef<void>, url: string) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.modalRef.content = url;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
