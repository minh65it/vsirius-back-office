/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdersQgoldService } from './orders-qgold.service';

describe('Service: OrdersQgold', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersQgoldService]
    });
  });

  it('should ...', inject([OrdersQgoldService], (service: OrdersQgoldService) => {
    expect(service).toBeTruthy();
  }));
});
