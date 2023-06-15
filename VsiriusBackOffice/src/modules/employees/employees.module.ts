import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { MainComponent } from './main/main.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { RoleMainComponent } from './role-main/role-main.component';


@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    UpdateComponent,
    RoleMainComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PaginationModule.forRoot(),
    TableModule,
    DropdownModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    NgSelectModule,
    ModalModule.forRoot()
  ]
})
export class EmployeesModule { }
