import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterafterloginComponent } from './footerafterlogin.component';

describe('FooterafterloginComponent', () => {
  let component: FooterafterloginComponent;
  let fixture: ComponentFixture<FooterafterloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterafterloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterafterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
