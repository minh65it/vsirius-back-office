import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SystemJobRoutes } from './system-job.routing.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SystemJobDetailComponent } from './system-job-detail/system-job-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SystemJobRoutes,
    FormsModule,
    PaginationModule.forRoot(),
    TableModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [MainComponent, SystemJobDetailComponent]
})
export class SystemJobModule { }
