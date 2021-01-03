import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycoupensComponent } from './mycoupens.component';

describe('MycoupensComponent', () => {
  let component: MycoupensComponent;
  let fixture: ComponentFixture<MycoupensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycoupensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycoupensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
