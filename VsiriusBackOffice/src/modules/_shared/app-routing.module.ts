import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // component: DefaultLayoutComponent,
    data: {
      breadcrumb: 'Trang Chủ',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('../vsirius-product/vsirius-product.module').then((m) => m.VsiriusProductModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
