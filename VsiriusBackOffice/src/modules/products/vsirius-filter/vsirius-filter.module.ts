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
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { InputCustomModule } from 'src/modules/_shared/_components/input-custom/input-custom.module';
@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    UpdateComponent
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
    TabViewModule,
    InputCustomModule,
    ModalModule.forRoot(),
  ]
})
export class VsiriusFilterModule { }
