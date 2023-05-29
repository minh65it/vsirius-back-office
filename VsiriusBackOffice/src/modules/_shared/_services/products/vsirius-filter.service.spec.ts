/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VsiriusFilterService } from './vsirius-filter.service';

describe('Service: VsiriusFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VsiriusFilterService]
    });
  });

  it('should ...', inject([VsiriusFilterService], (service: VsiriusFilterService) => {
    expect(service).toBeTruthy();
  }));
});
