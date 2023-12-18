/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdersAmazonService } from './orders-amazon.service';

describe('Service: OrdersAmazon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersAmazonService]
    });
  });

  it('should ...', inject([OrdersAmazonService], (service: OrdersAmazonService) => {
    expect(service).toBeTruthy();
  }));
});
