import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupenDetailComponent } from './coupen-detail.component';

describe('CoupenDetailComponent', () => {
  let component: CoupenDetailComponent;
  let fixture: ComponentFixture<CoupenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
