/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemLoggingService } from './system-logging.service';

describe('Service: SystemLogging', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemLoggingService]
    });
  });

  it('should ...', inject([SystemLoggingService], (service: SystemLoggingService) => {
    expect(service).toBeTruthy();
  }));
});
