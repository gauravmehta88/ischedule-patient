import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCoupenComponent } from './pay-coupen.component';

describe('PayCoupenComponent', () => {
  let component: PayCoupenComponent;
  let fixture: ComponentFixture<PayCoupenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayCoupenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
