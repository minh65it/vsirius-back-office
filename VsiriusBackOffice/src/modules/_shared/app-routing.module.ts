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
        path:'employees',
        loadChildren: () => import('../employees/employees.module').then((m) => m.EmployeesModule),
      },
      {
        path:'order-status',
        loadChildren: () => import('../orders/order-status/order-status.module').then((m) => m.OrderStatusModule),
      },
      {
        path:'orders',
        loadChildren: () => import('../orders/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path:'contacts',
        loadChildren: () => import('../contacts/contacts.module').then((m) => m.ContactsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
