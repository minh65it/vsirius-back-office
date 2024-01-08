/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LostPackageClaimComponent } from './lost-package-claim.component';

describe('LostPackageClaimComponent', () => {
  let component: LostPackageClaimComponent;
  let fixture: ComponentFixture<LostPackageClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPackageClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPackageClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
