import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductHomeRoutingModule } from './product-home-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabViewModule } from 'primeng/tabview';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ProductHomeRoutingModule,
    TableModule,
    DropdownModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    NgSelectModule,
    TabViewModule,
  ]
})
export class ProductHomeModule { }
