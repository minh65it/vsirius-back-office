import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // component: DefaultLayoutComponent,
    data: {
      breadcrumb: 'Home',
    },
    children: [
      {
        path: 'product',
        loadChildren: () => import('../vsirius-product/vsirius-product.module').then((m) => m.VsiriusProductModule),
      },
      {
        path: 'filter',
        loadChildren: () => import('../vsirius-filter/vsirius-filter.module').then((m) => m.VsiriusFilterModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
