import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatusRoutingModule } from './order-status-routing.module';
import { MainComponent } from './main/main.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    OrderStatusRoutingModule,
    PaginationModule.forRoot(),
    TableModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ModalModule.forRoot()
  ]
})
export class OrderStatusModule { }
