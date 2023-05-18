import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VsiriusProductRoutingModule } from './vsirius-product-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    VsiriusProductRoutingModule
  ]
})
export class VsiriusProductModule { }
