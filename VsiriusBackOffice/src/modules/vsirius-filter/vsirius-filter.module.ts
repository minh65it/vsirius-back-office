import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VsiriusFilterRoutingModule } from './vsirius-filter-routing.module';
import { MainComponent } from './main/main.component';

import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import {TabViewModule} from'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { NgSelectCustomModule } from '../_shared/_components/ng-select-custom/ng-select-custom.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputCustomModule } from '../_shared/_components/input-custom/input-custom.module';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    VsiriusFilterRoutingModule,
    PaginationModule.forRoot(),
    TableModule,
    DropdownModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    NgSelectModule,
    NgSelectCustomModule,
    TabViewModule,
    InputCustomModule,
    ModalModule.forRoot(),
  ]
})
export class VsiriusFilterModule { }
