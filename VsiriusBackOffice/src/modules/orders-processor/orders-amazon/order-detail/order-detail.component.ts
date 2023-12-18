import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmazonOrderDetailDTO } from 'src/modules/_shared/_models/order-processor/amzon-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  amazonOrderDetail: AmazonOrderDetailDTO = {} as AmazonOrderDetailDTO;
  id: string = '';
  constructor(
    private router: Router,
    private service: OrdersAmazonService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.service.currentIdOrder.subscribe({
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
    this.service.getDetail(this.id).subscribe({
      next: res => {
        this.amazonOrderDetail = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  detailSupplier(item: AmazonOrderDetailDTO) {
    if (item.qgoldOrderId != null) {
      this.serviceQgold.currentID(item.qgoldOrderId);
      this.router.navigate(['/orders-processor/detail-qgold']);
    }
  }
  back() {
    this.router.navigate(['/orders-processor/Amazon']);
  }

}
