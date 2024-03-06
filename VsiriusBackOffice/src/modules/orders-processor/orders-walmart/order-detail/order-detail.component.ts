import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { QgoldFtpOrderItem, QgoldFtpOrderObject } from 'src/modules/_shared/_models/order-processor/qgold-ftp-order-object';
import { WalmartOrderDetailDTO } from 'src/modules/_shared/_models/order-processor/walmart-order-Dto';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';
import { OrdersWalmartService } from 'src/modules/_shared/_services/orders-processor/orders-walmart.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  walmartOrderDetail: WalmartOrderDetailDTO = {} as WalmartOrderDetailDTO;
  id: string = '';
  subscription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private service: OrdersWalmartService,
    private notiflix: NgxNotiflixService,
    private serviceQgold: OrdersQgoldService,
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
        this.walmartOrderDetail = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.walmartOrderDetail = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  detailSupplier(item: WalmartOrderDetailDTO) {
    if (item.supplierOrderId != null) {
      this.serviceQgold.currentID(item.supplierOrderId);
      this.router.navigate(['orders/supplier/detail-qgold']);
    }
  }
  back() {
    this.router.navigate(['orders/marketplace/walmart']);
  }
  ReSubmitQgold(item: WalmartOrderDetailDTO) {

    const model = {} as QgoldFtpOrderObject;
    model.shipToName = item.buyerName;
    model.shipToAddress1 = item.address1;
    model.shipToAddress2 = item.address2;
    model.shipToCity = item.city;
    model.shipToState_Province = item.state;
    model.shipToZip = item.postalCode;
    model.shipToCountryCode = item.country;
    model.shipToPhone = item.phone;
    model.amz_Order_ID = item.purchaseOrderId;
    model.ship_Option_Code = '100';
    switch (item.methodShipping) {
      case 'Standard':
        model.ship_Method_Code = '1102';
        break;
      case 'Second Day':
        model.ship_Method_Code = '220';
        break;
      case 'Expedited':
        model.ship_Method_Code = '1100';
        break;
      case 'Ca':
        model.ship_Method_Code = '1701';
        break;
      default: {
        model.ship_Method_Code = '1102';
        break;
      }
    }
    model.item = [];
    let ii = {} as QgoldFtpOrderItem;
    item.items.forEach(el => {
      ii.item = el.sku;
      ii.qty = el.quantity?.toString();
      model.item.push(ii);
    });
    model.marketplace = "Walmart";
    this.serviceQgold.currentReOrder(model);
    this.router.navigate(['orders/supplier/submit-qgold']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
