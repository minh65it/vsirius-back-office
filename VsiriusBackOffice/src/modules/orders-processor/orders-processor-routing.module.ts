import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './orders-qgold/main/main.component';

const routes: Routes = [
  {
    path: 'Qgold',
    component: MainComponent,
    data: {
      breadcrumb: 'Order Qgold',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersProcessorRoutingModule { }
