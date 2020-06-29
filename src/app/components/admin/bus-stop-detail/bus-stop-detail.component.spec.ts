import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopDetailComponent } from './bus-stop-detail.component';

describe('BusStopDetailComponent', () => {
  let component: BusStopDetailComponent;
  let fixture: ComponentFixture<BusStopDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStopDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
