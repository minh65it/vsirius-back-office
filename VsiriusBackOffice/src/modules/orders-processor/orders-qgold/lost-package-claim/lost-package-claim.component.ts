import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { QgoldOrderDetailDTO } from 'src/modules/_shared/_models/order-processor/qgold-order-DTO';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-lost-package-claim',
  templateUrl: './lost-package-claim.component.html',
  styleUrls: ['./lost-package-claim.component.scss']
})
export class LostPackageClaimComponent implements OnInit {

  data: QgoldOrderDetailDTO = {} as QgoldOrderDetailDTO;
  dataSend: QgoldOrderDetailDTO = {} as QgoldOrderDetailDTO;
  modalRef: BsModalRef;
  subscription = Subscription.EMPTY;
  checkValidated: boolean = false;
  @ViewChild('myForm', { static: false }) myForm?: NgForm;
  constructor(
    private modalService: BsModalService,
    private service: OrdersQgoldService,
    private notiflix: NgxNotiflixService,
  ) { }

  ngOnInit() {
    this.dataSend = { ...this.data };
  }
  closeModal() {
    this.modalService.hide();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  sendMail() {
    if (this.myForm.valid) {
      this.checkValidated = false;
      this.subscription = this.service.sendMailPackageClaimQgold(this.dataSend).subscribe({
        next: res => {
          if (!res.success) {
            this.notiflix.error(res.message);
            this.notiflix.hideLoading();
            return;
          }
          this.notiflix.success(res.message);
          this.notiflix.hideLoading();
          this.closeModal();
        },
        error: () => {
          this.notiflix.error('Error System');
          this.notiflix.hideLoading();
        }
      });
    }
  }

}
