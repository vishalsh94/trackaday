import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStopSessionComponent } from './start-stop-session.component';

describe('StartStopSessionComponent', () => {
  let component: StartStopSessionComponent;
  let fixture: ComponentFixture<StartStopSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartStopSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartStopSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
