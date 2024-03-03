import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainComponent as MainStatusComponent } from '../order-status/main/main.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
