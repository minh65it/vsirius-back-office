import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaQgoldRoutes } from './qa-qgold.routing.module';
import { ListQuestionComponent } from './main/list-question.component';
import { SendMailQuestionComponent } from './send-mail-question/send-mail-question.component';

@NgModule({
  imports: [
    CommonModule,
    QaQgoldRoutes
  ],
  declarations: [
    ListQuestionComponent,
    SendMailQuestionComponent
  ]
})
export class QaQgoldModule { }
