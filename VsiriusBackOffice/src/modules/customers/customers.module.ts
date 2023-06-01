import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { MainComponent } from './main/main.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    MainComponent,
    UpdateComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
