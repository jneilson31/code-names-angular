import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedDeckComponent } from './red-deck.component';

describe('RedDeckComponent', () => {
  let component: RedDeckComponent;
  let fixture: ComponentFixture<RedDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
