/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdersStullerService } from './orders-stuller.service';

describe('Service: OrdersStuller', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersStullerService]
    });
  });

  it('should ...', inject([OrdersStullerService], (service: OrdersStullerService) => {
    expect(service).toBeTruthy();
  }));
});
