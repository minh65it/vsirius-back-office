import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    data: {
      breadcrumb: 'Product List',
    },
  },
  {
    path:'create',
    component:CreateComponent,
    data: {
      breadcrumb: 'Create Product',
    },
  },
  {
    path:'update',
    component:UpdateComponent,
    data: {
      breadcrumb: 'Update Product',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VsiriusProductRoutingModule { }
