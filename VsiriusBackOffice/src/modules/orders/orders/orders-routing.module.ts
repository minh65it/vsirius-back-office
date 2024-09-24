import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainComponent as MainStatusComponent } from '../order-status/main/main.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'marketplace/vsirius',
    component: MainComponent,
    data: {
      breadcrumb: 'List Orders',
    },
  },
  {
    path: 'marketplace/order-status-vsirius',
    component: MainStatusComponent,
    data: {
      breadcrumb: 'List Order Status',
    },
  },
  {
    path: 'marketplace/order-detail',
    component: OrderDetailComponent,
    data: {
      breadcrumb: 'Order Detail',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
