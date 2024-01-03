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
import { MainComponent as MainQgoldComponent } from './orders-qgold/main/main.component';
import { MainComponent as MainAmazonComponent } from './orders-amazon/main/main.component';
import { MainComponent as MainWalmartComponent } from './orders-walmart/main/main.component';
import { SubmitOrderComponent } from './orders-qgold/submit-order/submit-order.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderDetailComponent } from './orders-qgold/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailAmazonComponent } from './orders-amazon/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailWalmartComponent } from './orders-walmart/order-detail/order-detail.component';
import { SharePipeModule } from '../_shared/_pipes/share-pipe.module';

@NgModule({
  declarations: [
    //Qgold
    MainQgoldComponent,
    SubmitOrderComponent,
    OrderDetailComponent,
    //Amazon
    MainAmazonComponent,
    OrderDetailAmazonComponent,
    //Walmart
    MainWalmartComponent,
    OrderDetailWalmartComponent,
  ],
  imports: [
    SharePipeModule,
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
    NgSelectModule
  ],
})
export class OrdersProcessorModule { }
