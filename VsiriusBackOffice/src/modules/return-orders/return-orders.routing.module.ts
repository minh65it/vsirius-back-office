import { Routes, RouterModule } from '@angular/router';
import { ReturnAmazonComponent } from './return-amazon/main/return-amazon.component';
import { ReturnAmazonDetailComponent } from './return-amazon/return-detail/return-amazon-detail.component';
import { ReturnWalmartComponent } from './return-walmart/main/return-walmart.component';
import { ReturnWalmartDetailComponent } from './return-walmart/return-detail/return-walmart-detail.component';
import { ClaimListComponent } from './package-claims/main/claim-list.component';
import { ClaimDetailComponent } from './package-claims/detail/claim-detail.component';

const routes: Routes = [
  {
    path: 'Package-Claim',
    component: ClaimListComponent,
    data: {
      breadcrumb: 'Package Claim',
    },
  },
  {
    path: 'detail-claim',
    component: ClaimDetailComponent,
    data: {
      breadcrumb: 'Detail Claim',
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
