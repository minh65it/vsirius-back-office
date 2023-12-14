import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './orders-qgold/main/main.component';
import { SubmitOrderComponent } from './orders-qgold/submit-order/submit-order.component';

const routes: Routes = [
  {
    path: 'Qgold',
    component: MainComponent,
    data: {
      breadcrumb: 'Order Qgold',
    },
  },
  {
    path: 'submit-qgold',
    component: SubmitOrderComponent,
    data: {
      breadcrumb: 'Submit Order',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersProcessorRoutingModule { }
