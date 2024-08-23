import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent as MainQgoldComponent } from './orders-qgold/main/main.component';
import { MainComponent as MainStullerComponent } from './orders-stuller/main/main.component';
import { MainComponent as MainAmazonComponent } from './orders-amazon/main/main.component';
import { MainComponent as MainWalmartComponent } from './orders-walmart/main/main.component';
import { MainComponent as MainEbayComponent } from './order-ebay/main/main.component';
import { SubmitOrderComponent } from './orders-qgold/submit-order/submit-order.component';
import { OrderDetailComponent } from './orders-qgold/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailStullerComponent } from './orders-stuller/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailAmazonComponent } from './orders-amazon/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailWalmartComponent } from './orders-walmart/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailEbayComponent } from './order-ebay/order-detail/order-detail.component';
import { MainComponent as MainEtsyComponent } from './order-etsy/main/main.component';
import {OrderDetailComponent as OrderDetailEtsyComponent} from './order-etsy/order-detail/order-detail.component';
const routes: Routes = [
  //Qgold
  {
    path: 'supplier/qgold',
    component: MainQgoldComponent,
    data: {
      breadcrumb: 'Orders Qgold',
    },
  },
  {
    path: 'supplier/submit-qgold',
    component: SubmitOrderComponent,
    data: {
      breadcrumb: 'Submit Order',
    },
  },
  {
    path: 'supplier/detail-qgold',
    component: OrderDetailComponent,
    data: {
      breadcrumb: 'Order Detail Qgold',
    },
  },
  //Stuller
  {
    path: 'supplier/stuller',
    component: MainStullerComponent,
    data: {
      breadcrumb: 'Orders Stuller',
    },
  },
  {
    path: 'supplier/detail-stuller',
    component: OrderDetailStullerComponent,
    data: {
      breadcrumb: 'Order Detail Stuller',
    },
  },
  //Amazon
  {
    path: 'marketplace/amazon',
    component: MainAmazonComponent,
    data: {
      breadcrumb: 'Orders Amazon',
    },
  },
  {
    path: 'marketplace/detail-amazon',
    component: OrderDetailAmazonComponent,
    data: {
      breadcrumb: 'Order Detail Amazon',
    },
  },
  //Walmart
  {
    path: 'marketplace/walmart',
    component: MainWalmartComponent,
    data: {
      breadcrumb: 'Orders Walmart',
    },
  },
  {
    path: 'marketplace/detail-walmart',
    component: OrderDetailWalmartComponent,
    data: {
      breadcrumb: 'Order Detail Walmart',
    },
  },

  //Ebay
  {
    path: 'marketplace/ebay',
    component: MainEbayComponent,
    data: {
      breadcrumb: 'Orders Ebay',
    },
  },
  {
    path: 'marketplace/detail-ebay',
    component: OrderDetailEbayComponent,
    data: {
      breadcrumb: 'Order Detail Ebay',
    },
  },

  // Etsy
  {
    path: 'marketplace/etsy',
    component: MainEtsyComponent,
    data: {
      breadcrumb: 'Orders Etsy',
    },
  },
  {
    path: 'marketplace/detail-etsy',
    component: OrderDetailEtsyComponent,
    data: {
      breadcrumb: 'Order Detail Etsy',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersProcessorRoutingModule { }
