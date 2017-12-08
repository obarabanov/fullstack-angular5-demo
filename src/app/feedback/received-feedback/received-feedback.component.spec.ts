import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedFeedbackComponent } from './received-feedback.component';

describe('ReceivedFeedbackComponent', () => {
  let component: ReceivedFeedbackComponent;
  let fixture: ComponentFixture<ReceivedFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
