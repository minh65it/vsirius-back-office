import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersProcessorRoutingModule } from './orders-processor-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MainComponent } from './orders-qgold/main/main.component';
import { SubmitOrderComponent } from './orders-qgold/submit-order/submit-order.component';

@NgModule({
  declarations: [
    MainComponent,
    SubmitOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersProcessorRoutingModule,
    PaginationModule.forRoot(),
    TableModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
})
export class OrdersProcessorModule { }
