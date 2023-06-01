import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { RoleMainComponent } from './role-main/role-main.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    data: {
      breadcrumb: 'List Users',
    },
  },
  {
    path:'create',
    component:CreateComponent,
    data: {
      breadcrumb: 'Create User',
    },
  },
  {
    path:'update',
    component:UpdateComponent,
    data: {
      breadcrumb: 'Update User',
    },
  },
  {
    path:'role',
    component:RoleMainComponent,
    data: {
      breadcrumb: 'Role User',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
