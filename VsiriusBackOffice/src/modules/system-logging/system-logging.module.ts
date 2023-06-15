import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { SystemLoggingRoutingModule } from './system-logging-routing.module';
import { MainComponent } from './main/main.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SystemLoggingDetailComponent } from './system-logging-detail/system-logging-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    SystemLoggingRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    TableModule,
    CardModule,
    ImageModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [MainComponent, SystemLoggingDetailComponent]
})
export class SystemLoggingModule { }
