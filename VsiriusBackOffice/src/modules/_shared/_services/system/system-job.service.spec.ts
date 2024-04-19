/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemJobService } from './system-job.service';

describe('Service: SystemJob', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemJobService]
    });
  });

  it('should ...', inject([SystemJobService], (service: SystemJobService) => {
    expect(service).toBeTruthy();
  }));
});
