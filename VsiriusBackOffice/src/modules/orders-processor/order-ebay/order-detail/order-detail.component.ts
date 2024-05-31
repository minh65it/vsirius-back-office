import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EbayDto } from 'src/modules/_shared/_models/order-processor/ebay-order-Dto';
import { QgoldFtpOrderItem, QgoldFtpOrderObject } from 'src/modules/_shared/_models/order-processor/qgold-ftp-order-object';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrderEbayService } from 'src/modules/_shared/_services/orders-processor/order-ebay.service';
import { OrdersQgoldService } from 'src/modules/_shared/_services/orders-processor/orders-qgold.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  ebayOrderDetail: EbayDto = {} as EbayDto;
  id: string = '';
  subscription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private service: OrderEbayService,
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
        this.ebayOrderDetail = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.ebayOrderDetail = null;
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  detailSupplier(item: EbayDto) {
  }
  back() {
    this.router.navigate(['orders/marketplace/ebay']);
  }
  ReSubmitQgold(item: EbayDto) {
    const model = {} as QgoldFtpOrderObject;
    model.shipToName = item.CustomerName;
    model.shipToAddress1 = item.Address1;
    model.shipToAddress2 = item.Address2;
    model.shipToAddress3 = null;
    model.shipToCity = item.City;
    model.shipToState_Province = item.State;
    model.shipToZip = item.ZipCode;
    model.shipToCountryCode = item.Country;
    model.shipToPhone = item.CustomerPhone;
    model.amz_Order_ID = item.OrderId;
    model.ship_Option_Code = '100';
    // switch (item.Ship) {
    //   case 'Standard':
    //     model.ship_Method_Code = '1102';
    //     break;
    //   case 'Second Day':
    //     model.ship_Method_Code = '220';
    //     break;
    //   case 'Expedited':
    //     model.ship_Method_Code = '1100';
    //     break;
    //   case 'Ca':
    //     model.ship_Method_Code = '1701';
    //     break;
    //   default: {
    //     model.ship_Method_Code = '1102';
    //     break;
    //   }
    // }
    model.item = [];
    let ii = {} as QgoldFtpOrderItem;
    item.OrderDetails.forEach(el => {
      ii.item = el.Sku;
      ii.qty = el.Quantity?.toString();
      model.item.push(ii);
    });
    model.marketplace = "Ebay";
    this.serviceQgold.currentReOrder(model);
    this.router.navigate(['orders/supplier/submit-qgold']);
  }
  ReSubmitStuller(item: EbayDto) {
    this.router.navigate(['orders/supplier/submit-stuller']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
