import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleBookingDetailComponent } from './reschedule-booking-detail.component';

describe('RescheduleBookingDetailComponent', () => {
  let component: RescheduleBookingDetailComponent;
  let fixture: ComponentFixture<RescheduleBookingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescheduleBookingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
