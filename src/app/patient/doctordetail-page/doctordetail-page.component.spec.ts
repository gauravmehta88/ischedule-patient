import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctordetailPageComponent } from './doctordetail-page.component';

describe('DoctordetailPageComponent', () => {
  let component: DoctordetailPageComponent;
  let fixture: ComponentFixture<DoctordetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctordetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctordetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
