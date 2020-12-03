import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderafterloginComponent } from './headerafterlogin.component';

describe('HeaderafterloginComponent', () => {
  let component: HeaderafterloginComponent;
  let fixture: ComponentFixture<HeaderafterloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderafterloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderafterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
