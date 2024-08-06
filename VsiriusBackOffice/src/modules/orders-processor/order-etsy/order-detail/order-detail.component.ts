import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EtsyDto } from 'src/modules/_shared/_models/order-processor/etsy-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrderEtsyService } from 'src/modules/_shared/_services/orders-processor/order-etsy.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  etsyOrderDetail: EtsyDto = {} as EtsyDto;
  id: number = 0;
  subscription = Subscription.EMPTY;
  transactionSize = 0;
  shipmentSize = 0;
  refundSize = 0;


  constructor(
    private router: Router,
    private service: OrderEtsyService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.subscription = this.service.currentIdOrder.subscribe({
      next: res => {
        if (res === 0) {
          this.back();
        } else {
          this.id = res;
          if(this.id) {
            this.getDetail();
          }

        }
      }
    })
  }

  getDetail() {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(this.id).subscribe({
      next: res => {
        this.etsyOrderDetail = res;
        console.log(res);
        this.notiflix.hideLoading();
      },
      error: () => {
        this.etsyOrderDetail = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

  back() {
    this.router.navigate(['orders/marketplace/etsy']);
  }

  ReSubmitQgold(item : any) {

  }

  ReSubmitStuller(item : any) {

  }

  detailSupplier(item : any) {

  }

  calculateField(item : any[]) : number {

    return Object.keys(item.at(0)).length;
  }
  show(type : string) {
    switch (type) {
      case 'transaction':
        this.transactionSize = 36*9;
        break;

      case 'shipment':
        this.shipmentSize = 36*5;
        break;

      case 'refund':
        this.refundSize = 36*5 ;
        break;
    
      default:
        break;
    } 
  }

  hide(type : string) {
    switch (type) {
      case 'transaction':
        this.transactionSize = 0;
        break;

      case 'shipment':
        this.shipmentSize = 0;
        break;

      case 'refund':
        this.refundSize = 0;
        break;
    
      default:
        break;
    } 
  }

}
