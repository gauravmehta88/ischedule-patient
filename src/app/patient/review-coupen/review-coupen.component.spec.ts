import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCoupenComponent } from './review-coupen.component';

describe('ReviewCoupenComponent', () => {
  let component: ReviewCoupenComponent;
  let fixture: ComponentFixture<ReviewCoupenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCoupenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
