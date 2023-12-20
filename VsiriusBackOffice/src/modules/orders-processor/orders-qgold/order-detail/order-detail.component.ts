import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QgoldOrderDetailDTO } from 'src/modules/_shared/_models/order-processor/qgold-order-DTO';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  qgoldOrderDetail: QgoldOrderDetailDTO = {} as QgoldOrderDetailDTO;
  id: string = '';
  subscription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private service: OrdersQgoldService,
    private notiflix: NgxNotiflixService,
    private serviceAmazon: OrdersAmazonService,
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.subscription = this.service.currentIdOrder.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          this.back();
        } else {
          this.id = res;
          this.getDetail();
        }
      }
    })
  }

  getDetail() {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(this.id).subscribe({
      next: res => {
        this.qgoldOrderDetail = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  detailMarket(item: QgoldOrderDetailDTO) {
    if (item.marketplace.includes('Amazon')) {
      this.serviceAmazon.currentID(item.marketOrderId);
      this.router.navigate(['/orders-processor/detail-amazon']);
    }
  }
  back() {
    this.router.navigate(['/orders-processor/Qgold']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
