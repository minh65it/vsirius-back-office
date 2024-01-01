/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReturnAmazonService } from './return-amazon.service';

describe('Service: ReturnAmazon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnAmazonService]
    });
  });

  it('should ...', inject([ReturnAmazonService], (service: ReturnAmazonService) => {
    expect(service).toBeTruthy();
  }));
});
