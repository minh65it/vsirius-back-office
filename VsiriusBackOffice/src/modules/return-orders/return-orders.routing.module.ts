import { Routes, RouterModule } from '@angular/router';
import { PackageClaimsComponent } from './package-claims/package-claims.component';
import { ReturnAmazonComponent } from './return-amazon/main/return-amazon.component';
import { ReturnAmazonDetailComponent } from './return-amazon/return-detail/return-amazon-detail.component';
import { ReturnWalmartComponent } from './return-walmart/main/return-walmart.component';
import { ReturnWalmartDetailComponent } from './return-walmart/return-detail/return-walmart-detail.component';

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
      breadcrumb: 'Detail Return Amazon',
    },
  },
  {
    path: 'Walmart',
    component: ReturnWalmartComponent,
    data: {
      breadcrumb: 'Walmart',
    },
  },
  {
    path: 'detail-walmart',
    component: ReturnWalmartDetailComponent,
    data: {
      breadcrumb: 'Detail Return Walmart',
    },
  },
];

export const ReturnOrdersRoutes = RouterModule.forChild(routes);
