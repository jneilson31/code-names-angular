import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssassinFeedbackComponent } from './assassin-feedback.component';

describe('AssassinFeedbackComponent', () => {
  let component: AssassinFeedbackComponent;
  let fixture: ComponentFixture<AssassinFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssassinFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssassinFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
