import { Routes, RouterModule } from '@angular/router';
import { PackageClaimsComponent } from './package-claims/package-claims.component';
import { ReturnAmazonComponent } from './return-amazon/return-amazon.component';

const routes: Routes = [
  {
    path: 'Package-Claim',
    component: PackageClaimsComponent,
    data: {
      breadcrumb: 'Package Claim',
    },
  },
  {
    path: 'Amazon',
    component: ReturnAmazonComponent,
    data: {
      breadcrumb: 'Amazon',
    },
  },
];

export const ReturnOrdersRoutes = RouterModule.forChild(routes);
