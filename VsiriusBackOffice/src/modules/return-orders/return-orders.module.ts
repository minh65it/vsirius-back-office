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
import { PackageClaimsComponent } from './package-claims/package-claims.component';
import { ReturnAmazonComponent } from './return-amazon/return-amazon.component';

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
    NgSelectModule
  ],
  declarations: [
    PackageClaimsComponent,
    ReturnAmazonComponent
  ]
})
export class ReturnOrdersModule { }
