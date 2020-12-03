import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDoctorComponent } from './review-doctor.component';

describe('ReviewDoctorComponent', () => {
  let component: ReviewDoctorComponent;
  let fixture: ComponentFixture<ReviewDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
