/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReturnWalmartService } from './return-walmart.service';

describe('Service: ReturnWalmart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnWalmartService]
    });
  });

  it('should ...', inject([ReturnWalmartService], (service: ReturnWalmartService) => {
    expect(service).toBeTruthy();
  }));
});
