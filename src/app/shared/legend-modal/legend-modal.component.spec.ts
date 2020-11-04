import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendModalComponent } from './legend-modal.component';

describe('LegendModalComponent', () => {
  let component: LegendModalComponent;
  let fixture: ComponentFixture<LegendModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
