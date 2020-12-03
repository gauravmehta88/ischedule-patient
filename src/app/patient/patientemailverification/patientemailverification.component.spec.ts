import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientemailverificationComponent } from './patientemailverification.component';

describe('PatientemailverificationComponent', () => {
  let component: PatientemailverificationComponent;
  let fixture: ComponentFixture<PatientemailverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientemailverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientemailverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
