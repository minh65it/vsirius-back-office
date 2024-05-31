/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderEbayService } from './order-ebay.service';

describe('Service: OrderEbay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderEbayService]
    });
  });

  it('should ...', inject([OrderEbayService], (service: OrderEbayService) => {
    expect(service).toBeTruthy();
  }));
});
