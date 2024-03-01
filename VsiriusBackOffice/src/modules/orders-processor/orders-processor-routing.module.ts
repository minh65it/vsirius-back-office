import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent as MainQgoldComponent } from './orders-qgold/main/main.component';
import { MainComponent as MainStullerComponent } from './orders-stuller/main/main.component';
import { MainComponent as MainAmazonComponent } from './orders-amazon/main/main.component';
import { MainComponent as MainWalmartComponent } from './orders-walmart/main/main.component';
import { SubmitOrderComponent } from './orders-qgold/submit-order/submit-order.component';
import { OrderDetailComponent } from './orders-qgold/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailStullerComponent } from './orders-stuller/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailAmazonComponent } from './orders-amazon/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailWalmartComponent } from './orders-walmart/order-detail/order-detail.component';

const routes: Routes = [
  //Qgold
  {
    path: 'Qgold',
    component: MainQgoldComponent,
    data: {
      breadcrumb: 'Orders Qgold',
    },
  },
  {
    path: 'submit-qgold',
    component: SubmitOrderComponent,
    data: {
      breadcrumb: 'Submit Order',
    },
  },
  {
    path: 'detail-qgold',
    component: OrderDetailComponent,
    data: {
      breadcrumb: 'Order Detail Qgold',
    },
  },
  //Stuller
  {
    path: 'Stuller',
    component: MainStullerComponent,
    data: {
      breadcrumb: 'Orders Stuller',
    },
  },
  {
    path: 'detail-stuller',
    component: OrderDetailStullerComponent,
    data: {
      breadcrumb: 'Order Detail Stuller',
    },
  },
  //Amazon
  {
    path: 'Amazon',
    component: MainAmazonComponent,
    data: {
      breadcrumb: 'Orders Amazon',
    },
  },
  {
    path: 'detail-amazon',
    component: OrderDetailAmazonComponent,
    data: {
      breadcrumb: 'Order Detail Amazon',
    },
  },
  //Walmart
  {
    path: 'Walmart',
    component: MainWalmartComponent,
    data: {
      breadcrumb: 'Orders Walmart',
    },
  },
  {
    path: 'detail-walmart',
    component: OrderDetailWalmartComponent,
    data: {
      breadcrumb: 'Order Detail Walmart',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersProcessorRoutingModule { }
