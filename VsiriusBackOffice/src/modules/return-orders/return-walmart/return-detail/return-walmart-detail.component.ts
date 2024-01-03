import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReturnOrder } from 'src/modules/_shared/_models/return-orders/return-walmart';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
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
  constructor(
    private router: Router,
    private service: ReturnWalmartService,
    private notiflix: NgxNotiflixService,
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

}
