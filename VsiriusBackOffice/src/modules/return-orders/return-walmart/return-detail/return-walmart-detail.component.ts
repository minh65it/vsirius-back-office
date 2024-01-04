import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ReturnOrder } from 'src/modules/_shared/_models/return-orders/return-walmart';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersWalmartService } from 'src/modules/_shared/_services/orders-processor/orders-walmart.service';
import { ReturnWalmartService } from 'src/modules/_shared/_services/return-orders/return-walmart.service';

@Component({
  selector: 'app-return-walmart-detail',
  templateUrl: './return-walmart-detail.component.html',
  styleUrls: ['./return-walmart-detail.component.scss']
})
export class ReturnWalmartDetailComponent implements OnInit {

  returnOrder: ReturnOrder = {} as ReturnOrder;
  returnOrderId: string = '';
  subscription = Subscription.EMPTY;
  modalRef?: BsModalRef;
  constructor(
    private router: Router,
    private service: ReturnWalmartService,
    private notiflix: NgxNotiflixService,
    private modalService: BsModalService,
    private serviceWalmart: OrdersWalmartService,
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.subscription = this.service.currentID.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.back();
        } else {
          this.returnOrderId = res;
          this.getDetail();
        }
      }
    })
  }
  getDetail() {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(this.returnOrderId).subscribe({
      next: res => {
        this.returnOrder = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.returnOrder = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  back() {
    this.router.navigate(['/return-orders/Walmart']);
  }
  detailOrder(purchaseOrderId: string) {
    this.serviceWalmart.currentID(purchaseOrderId);
    this.router.navigate(['/orders-processor/detail-walmart']);
  }
  openModal(template: TemplateRef<void>, url: string) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.modalRef.content = url;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
