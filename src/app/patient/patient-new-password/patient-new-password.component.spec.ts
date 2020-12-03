import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNewPasswordComponent } from './patient-new-password.component';

describe('PatientNewPasswordComponent', () => {
  let component: PatientNewPasswordComponent;
  let fixture: ComponentFixture<PatientNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
