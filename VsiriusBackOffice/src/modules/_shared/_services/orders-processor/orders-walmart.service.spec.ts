/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdersWalmartService } from './orders-walmart.service';

describe('Service: OrdersWalmart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersWalmartService]
    });
  });

  it('should ...', inject([OrdersWalmartService], (service: OrdersWalmartService) => {
    expect(service).toBeTruthy();
  }));
});
