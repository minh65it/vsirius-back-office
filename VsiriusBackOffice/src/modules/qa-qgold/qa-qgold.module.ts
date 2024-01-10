import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaQgoldRoutes } from './qa-qgold.routing.module';
import { ListQuestionComponent } from './main/list-question.component';
import { SendMailQuestionComponent } from './send-mail-question/send-mail-question.component';
import { SharePipeModule } from '../_shared/_pipes/share-pipe.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetailQuestionComponent } from './detail-question/detail-question.component';

@NgModule({
  imports: [
    CommonModule,
    QaQgoldRoutes,
    SharePipeModule,
    PaginationModule.forRoot(),
    TableModule,
    ProgressBarModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    ListQuestionComponent,
    SendMailQuestionComponent,
    DetailQuestionComponent
  ]
})
export class QaQgoldModule { }
