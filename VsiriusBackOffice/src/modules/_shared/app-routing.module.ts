import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      breadcrumb: 'Home',
    },
    children: [
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule),
      },
      {
        path:'users',
        loadChildren: () => import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path:'customer',
        loadChildren: () => import('../customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path:'cart',
        loadChildren: () => import('../cart/cart.module').then((m) => m.CartModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
