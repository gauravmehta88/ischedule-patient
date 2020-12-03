import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRecordsComponent } from './share-records.component';

describe('ShareRecordsComponent', () => {
  let component: ShareRecordsComponent;
  let fixture: ComponentFixture<ShareRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
