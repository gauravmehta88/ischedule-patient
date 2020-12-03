import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupenComponent } from './coupen.component';

describe('CoupenComponent', () => {
  let component: CoupenComponent;
  let fixture: ComponentFixture<CoupenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
