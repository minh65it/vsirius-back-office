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
        path: 'products',
        loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
