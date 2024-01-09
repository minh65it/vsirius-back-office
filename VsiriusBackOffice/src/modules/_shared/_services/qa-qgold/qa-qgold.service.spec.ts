/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QaQgoldService } from './qa-qgold.service';

describe('Service: QaQgold', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QaQgoldService]
    });
  });

  it('should ...', inject([QaQgoldService], (service: QaQgoldService) => {
    expect(service).toBeTruthy();
  }));
});
