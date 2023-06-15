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
      breadcrumb: 'List Employees',
    },
  },
  {
    path:'create',
    component:CreateComponent,
    data: {
      breadcrumb: 'Create Employee',
    },
  },
  {
    path:'update',
    component:UpdateComponent,
    data: {
      breadcrumb: 'Update Employee',
    },
  },
  {
    path:'role',
    component:RoleMainComponent,
    data: {
      breadcrumb: 'Role Employee',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
