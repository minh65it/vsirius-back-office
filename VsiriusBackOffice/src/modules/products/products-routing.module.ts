import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // component: DefaultLayoutComponent,
    data: {
      breadcrumb: 'VSirius Product',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('../products/vsirius-product/vsirius-product.module').then((m) => m.VsiriusProductModule),
      },
      {
        path: 'filter',
        loadChildren: () => import('../products/vsirius-filter/vsirius-filter.module').then((m) => m.VsiriusFilterModule),
      },
      {
        path: 'product-home',
        loadChildren: () => import('../products/product-home/product-home.module').then((m) => m.ProductHomeModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
