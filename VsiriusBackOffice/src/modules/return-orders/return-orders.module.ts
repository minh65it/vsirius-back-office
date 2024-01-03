import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnOrdersRoutes } from './return-orders.routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReturnAmazonComponent } from './return-amazon/main/return-amazon.component';
import { ReturnAmazonDetailComponent } from './return-amazon/return-detail/return-amazon-detail.component';
import { SharePipeModule } from '../_shared/_pipes/share-pipe.module';
import { ReturnWalmartComponent } from './return-walmart/main/return-walmart.component';
import { ReturnWalmartDetailComponent } from './return-walmart/return-detail/return-walmart-detail.component';
import { ClaimListComponent } from './package-claims/main/claim-list.component';
import { ClaimDetailComponent } from './package-claims/detail/claim-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReturnOrdersRoutes,
    PaginationModule.forRoot(),
    TableModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule,
    SharePipeModule
  ],
  declarations: [
    ClaimListComponent,
    ClaimDetailComponent,
    ReturnAmazonComponent,
    ReturnAmazonDetailComponent,
    ReturnWalmartComponent,
    ReturnWalmartDetailComponent
  ],
})
export class ReturnOrdersModule { }
