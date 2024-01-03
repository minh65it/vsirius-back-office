import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReturnFBMOrderRowDto } from 'src/modules/_shared/_models/return-orders/return-amazon';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { ReturnAmazonService } from 'src/modules/_shared/_services/return-orders/return-amazon.service';

@Component({
  selector: 'app-return-amazon-detail',
  templateUrl: './return-amazon-detail.component.html',
  styleUrls: ['./return-amazon-detail.component.scss']
})
export class ReturnAmazonDetailComponent implements OnInit {

  returnFBMOrder: ReturnFBMOrderRowDto = {} as ReturnFBMOrderRowDto;
  amazonRMAID: string = '';
  subscription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private service: ReturnAmazonService,
    private notiflix: NgxNotiflixService,
    private serviceAmazon: OrdersAmazonService,
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
          this.amazonRMAID = res;
          this.getDetail();
        }
      }
    })
  }
  getDetail() {
    this.notiflix.showLoading();
    this.subscription = this.service.getDetail(this.amazonRMAID).subscribe({
      next: res => {
        this.returnFBMOrder = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.returnFBMOrder = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  back() {
    this.router.navigate(['/return-orders/Amazon']);
  }
  detailOrder(orderID: string) {
    this.serviceAmazon.currentID(orderID);
    this.router.navigate(['/orders-processor/detail-amazon']);
  }

}
