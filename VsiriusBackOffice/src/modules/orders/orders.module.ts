import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OrdersRoutingModule } from './orders/orders-routing.module';
import { OrdersProcessorRoutingModule } from '../orders-processor/orders-processor-routing.module';
import { ReturnOrdersRoutes } from '../return-orders/return-orders.routing.module';

import { MainComponent as MainVSiriusComponent } from './orders/main/main.component';
import { MainComponent as MainVSiriusStatusComponent } from './order-status/main/main.component';
import { MainComponent as MainQgoldComponent } from '../orders-processor/orders-qgold/main/main.component';
import { MainComponent as MainStullerComponent } from '../orders-processor/orders-stuller/main/main.component';
import { MainComponent as MainAmazonComponent } from '../orders-processor/orders-amazon/main/main.component';
import { MainComponent as MainWalmartComponent } from '../orders-processor/orders-walmart/main/main.component';
import { MainComponent as MainEbayComponent } from '../orders-processor/order-ebay/main/main.component';
import { OrderDetailComponent as OrderDetailQgoldComponent } from '../orders-processor/orders-qgold/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailStullerComponent } from '../orders-processor/orders-stuller/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailAmazonComponent } from '../orders-processor/orders-amazon/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailWalmartComponent } from '../orders-processor/orders-walmart/order-detail/order-detail.component';
import { OrderDetailComponent as OrderDetailEbayComponent } from '../orders-processor/order-ebay/order-detail/order-detail.component';
import { LostPackageClaimComponent } from '../orders-processor/orders-qgold/lost-package-claim/lost-package-claim.component';
import { SubmitOrderComponent as SubmitOrderQgoldComponent } from '../orders-processor/orders-qgold/submit-order/submit-order.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharePipeModule } from '../_shared/_pipes/share-pipe.module';
import { ClaimListComponent } from '../return-orders/package-claims/main/claim-list.component';
import { ClaimDetailComponent } from '../return-orders/package-claims/detail/claim-detail.component';
import { ReturnAmazonDetailComponent } from '../return-orders/return-amazon/return-detail/return-amazon-detail.component';
import { ReturnAmazonComponent } from '../return-orders/return-amazon/main/return-amazon.component';
import { ReturnWalmartComponent } from '../return-orders/return-walmart/main/return-walmart.component';
import { ReturnWalmartDetailComponent } from '../return-orders/return-walmart/return-detail/return-walmart-detail.component';

@NgModule({
  declarations: [
    //Qgold
    MainQgoldComponent,
    SubmitOrderQgoldComponent,
    OrderDetailQgoldComponent,
    LostPackageClaimComponent,
    //Stuller
    MainStullerComponent,
    OrderDetailStullerComponent,
    //VSirius
    MainVSiriusComponent,
    MainVSiriusStatusComponent,
    //Amazon
    MainAmazonComponent,
    OrderDetailAmazonComponent,
    //Walmart
    MainWalmartComponent,
    OrderDetailWalmartComponent,
    //Ebay
    MainEbayComponent,
    OrderDetailEbayComponent,
    //Claim
    ClaimListComponent,
    ClaimDetailComponent,
    //Return-Amazon
    ReturnAmazonComponent,
    ReturnAmazonDetailComponent,
    //Return-Walmart
    ReturnWalmartComponent,
    ReturnWalmartDetailComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrdersProcessorRoutingModule,
    ReturnOrdersRoutes,
    PaginationModule.forRoot(),
    TableModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RadioButtonModule,
    TableModule,
    NgSelectModule,
    SharePipeModule
  ],
})
export class OrdersModule { }
