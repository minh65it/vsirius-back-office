import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AmazonOrderDetailDTO } from 'src/modules/_shared/_models/order-processor/amzon-order-Dto';
import { QgoldFtpOrderItem, QgoldFtpOrderObject } from 'src/modules/_shared/_models/order-processor/qgold-ftp-order-object';
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
  subscription = Subscription.EMPTY;
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
        this.amazonOrderDetail = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.amazonOrderDetail = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  detailSupplier(item: AmazonOrderDetailDTO) {
    if (item.supplierOrderId != null) {
      this.serviceQgold.currentID(item.supplierOrderId);
      this.router.navigate(['/orders-processor/detail-qgold']);
    }
  }
  back() {
    this.router.navigate(['/orders-processor/Amazon']);
  }
  ReSubmitQgold(item: AmazonOrderDetailDTO) {
    const model = {} as QgoldFtpOrderObject;
    model.shipToName = item.buyerName;
    model.shipToAddress1 = item.addressLine1;
    model.shipToAddress2 = item.addressLine2;
    model.shipToAddress3 = item.addressLine3;
    model.shipToCity = item.city;
    model.shipToState_Province = item.stateOrRegion;
    model.shipToZip = item.postalCode;
    model.shipToCountryCode = item.countryCode;
    model.shipToPhone = item.phone;
    model.amz_Order_ID = item.amazonOrderId;
    model.ship_Option_Code = '100';
    switch (item.shipmentServiceLevelCategory) {
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
    item.orderItemList.forEach(el => {
      ii.item = el.sellerSKU;
      ii.qty = el.quantityOrdered?.toString();
      model.item.push(ii);
    });
    model.marketplace = "Amazon";
    this.serviceQgold.currentReOrder(model);
    this.router.navigate(['/orders-processor/submit-qgold']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
