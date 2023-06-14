import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { MainComponent } from './main/main.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    PaginationModule.forRoot(),
    TableModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    TooltipModule.forRoot(),
    ButtonModule,
    NgSelectModule,
    ModalModule.forRoot()
  ]
})
export class ContactsModule { }
