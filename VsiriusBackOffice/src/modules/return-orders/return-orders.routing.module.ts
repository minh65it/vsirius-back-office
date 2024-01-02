import { Routes, RouterModule } from '@angular/router';
import { PackageClaimsComponent } from './package-claims/package-claims.component';
import { ReturnAmazonComponent } from './return-amazon/main/return-amazon.component';
import { ReturnAmazonDetailComponent } from './return-amazon/return-detail/return-amazon-detail.component';

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
  {
    path: 'detail-amazon',
    component: ReturnAmazonDetailComponent,
    data: {
      breadcrumb: 'Detail Amazon',
    },
  },
];

export const ReturnOrdersRoutes = RouterModule.forChild(routes);
