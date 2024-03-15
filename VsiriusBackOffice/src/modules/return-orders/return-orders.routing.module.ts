import { Routes, RouterModule } from '@angular/router';
import { ReturnAmazonComponent } from './return-amazon/main/return-amazon.component';
import { ReturnAmazonDetailComponent } from './return-amazon/return-detail/return-amazon-detail.component';
import { ReturnWalmartComponent } from './return-walmart/main/return-walmart.component';
import { ReturnWalmartDetailComponent } from './return-walmart/return-detail/return-walmart-detail.component';
import { ClaimListComponent } from './package-claims/main/claim-list.component';
import { ClaimDetailComponent } from './package-claims/detail/claim-detail.component';

const routes: Routes = [
  {
    path: 'package-claim',
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
    path: 'marketplace/return-amazon',
    component: ReturnAmazonComponent,
    data: {
      breadcrumb: 'Amazon',
    },
  },
  {
    path: 'marketplace/detail-return-amazon',
    component: ReturnAmazonDetailComponent,
    data: {
      breadcrumb: 'Detail Return Amazon',
    },
  },
  {
    path: 'marketplace/return-walmart',
    component: ReturnWalmartComponent,
    data: {
      breadcrumb: 'Walmart',
    },
  },
  {
    path: 'marketplace/detail-return-walmart',
    component: ReturnWalmartDetailComponent,
    data: {
      breadcrumb: 'Detail Return Walmart',
    },
  },
];

export const ReturnOrdersRoutes = RouterModule.forChild(routes);
