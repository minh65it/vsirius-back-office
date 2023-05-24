import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { VsiriusProductRoutingModule } from './vsirius-product-routing.module';
import { MainComponent } from './main/main.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import {TabViewModule} from'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { NgSelectCustomModule } from '../_shared/_components/ng-select-custom/ng-select-custom.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputCustomModule } from '../_shared/_components/input-custom/input-custom.module';

@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    VsiriusProductRoutingModule,
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
    InputCustomModule
  ]
})
export class VsiriusProductModule { }
