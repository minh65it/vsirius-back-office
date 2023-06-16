import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MainComponent } from './main/main.component';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { AnonymousUsersPipe } from '../_shared/_pipes/anonymous-users.pipe';


@NgModule({
  declarations: [
    MainComponent,
    CartDetailComponent,
    AnonymousUsersPipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    TableModule,
    ModalModule.forRoot(),
    CardModule,
    ImageModule,
  ]
})
export class CartModule { }
