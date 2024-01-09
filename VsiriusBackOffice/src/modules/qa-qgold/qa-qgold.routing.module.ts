import { Routes, RouterModule } from '@angular/router';
import { ListQuestionComponent } from './main/list-question.component';
import { SendMailQuestionComponent } from './send-mail-question/send-mail-question.component';

const routes: Routes = [
  {
    path: '',
    component: ListQuestionComponent,
    data: {
      breadcrumb: 'List question Qgold',
    },
  },
  {
    path: 'send-mail',
    component: SendMailQuestionComponent,
    data: {
      breadcrumb: 'Send mail to Qgold',
    },
  },
];

export const QaQgoldRoutes = RouterModule.forChild(routes);
