import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VsiriusOrderDetail } from 'src/modules/_shared/_models/vsiriusOrderDetail';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';
import { OrderService } from 'src/modules/_shared/_services/orders/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  
  vsiriusOrder: VsiriusOrderDetail = {} as VsiriusOrderDetail;
  orderId : string = '';
  subscription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private service: OrderService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.currentIdOrder.subscribe({
      next: res => {
        if (Object.keys(res).length === 0) {
          console.log('khong co id');
        } else {
          this.orderId = res;
          if(this.orderId) {
            console.log(this.orderId);
            this.getDetail(this.orderId);
          } 
        }
      }
    });
  }

  getDetail(id : string) {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(id).subscribe({
      next: res => {
        this.vsiriusOrder = res;
        this.notiflix.hideLoading();
        console.log(this.vsiriusOrder);
        
      },
      error: () => {
        this.vsiriusOrder = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
}
