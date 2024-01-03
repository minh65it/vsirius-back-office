/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PackageClaimService } from './package-claim.service';

describe('Service: PackageClaim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageClaimService]
    });
  });

  it('should ...', inject([PackageClaimService], (service: PackageClaimService) => {
    expect(service).toBeTruthy();
  }));
});
