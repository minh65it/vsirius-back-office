/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductHomeService } from './product-home.service';

describe('Service: ProductHome', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductHomeService]
    });
  });

  it('should ...', inject([ProductHomeService], (service: ProductHomeService) => {
    expect(service).toBeTruthy();
  }));
});
