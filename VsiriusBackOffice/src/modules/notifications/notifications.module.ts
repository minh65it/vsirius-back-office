import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
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
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DragDropModule } from 'primeng/dragdrop';
@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    PaginationModule.forRoot(),
    TableModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    TooltipModule.forRoot(),
    ButtonModule,
    NgSelectModule,
    CKEditorModule,
    ModalModule.forRoot(),
    DragDropModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class NotificationsModule { }
