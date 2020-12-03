import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordconfirmationComponent } from './forgotpasswordconfirmation.component';

describe('ForgotpasswordconfirmationComponent', () => {
  let component: ForgotpasswordconfirmationComponent;
  let fixture: ComponentFixture<ForgotpasswordconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
